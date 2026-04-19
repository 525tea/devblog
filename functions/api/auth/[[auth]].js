/**
 * Cloudflare Pages Function — GitHub OAuth proxy for Decap CMS
 * Handles: GET /api/auth  (redirect to GitHub)
 *          GET /api/auth/callback  (exchange code for token)
 *
 * Required environment variables (set in Cloudflare Pages → Settings → Environment variables):
 *   GITHUB_CLIENT_ID
 *   GITHUB_CLIENT_SECRET
 */

const ALLOWED_ORIGINS = ['https://read-me.pages.dev'];

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export async function onRequest({ request, env }) {
  const url = new URL(request.url);
  const origin = request.headers.get('origin') || '';

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }

  // GET /api/auth → redirect to GitHub OAuth
  if (url.pathname === '/api/auth') {
    const params = new URLSearchParams({
      client_id: env.GITHUB_CLIENT_ID,
      redirect_uri: `${url.origin}/api/auth/callback`,
      scope: 'repo,user',
    });
    return Response.redirect(`https://github.com/login/oauth/authorize?${params}`, 302);
  }

  // GET /api/auth/callback → exchange code → post message to opener
  if (url.pathname === '/api/auth/callback') {
    const code = url.searchParams.get('code');
    if (!code) {
      return new Response('Missing code', { status: 400 });
    }

    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const data = await tokenRes.json();

    if (data.error) {
      return new Response(`OAuth error: ${data.error_description}`, { status: 400 });
    }

    // Decap CMS expects a window.postMessage from the callback page
    const html = `<!doctype html><html><body><script>
      (function() {
        function receiveMessage(e) {
          window.opener.postMessage(
            'authorization:github:success:${JSON.stringify({ token: data.access_token, provider: 'github' }).replace(/'/g, "\\'")}',
            e.origin
          );
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:github", "*");
      })();
    <\/script></body></html>`;

    return new Response(html, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  return new Response('Not found', { status: 404 });
}
