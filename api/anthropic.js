// Optional self-hosted proxy. NOT used in the default GitHub Pages deployment (tools call Anthropic directly).
// Requires ALLOWED_ORIGIN env var set to your exact domain (e.g. https://lensmorofficial.github.io). Wildcard is disallowed.
// The caller must supply apiKey in the request body — no server-side API key fallback is supported.
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

module.exports = async function handler(req, res) {
  if (!ALLOWED_ORIGIN) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Proxy is not configured: set ALLOWED_ORIGIN env var to your deployment domain.' }));
    return;
  }
  setCors(res);
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end('Method Not Allowed');
    return;
  }

  let body = req.body;
  if (!body) {
    let raw = '';
    await new Promise(resolve => {
      req.on('data', chunk => { raw += chunk; });
      req.on('end', resolve);
    });
    try { body = JSON.parse(raw || '{}'); } catch (e) { body = {}; }
  } else if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }

  const apiKey = body.apiKey; // Caller must supply key — no server-side env fallback
  if (!apiKey) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Missing apiKey in request body' }));
    return;
  }

  const payload = {
    model: body.model,
    max_tokens: body.max_tokens || 1024,
    messages: body.messages
  };

  if (body.temperature !== undefined) payload.temperature = body.temperature;
  if (body.metadata) payload.metadata = body.metadata;

  try {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(payload)
    });

    const text = await resp.text();
    res.statusCode = resp.status;
    res.setHeader('Content-Type', 'application/json');
    res.end(text);
  } catch (e) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: e.message || 'Proxy error' }));
  }
};
