const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

module.exports = async function handler(req, res) {
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

  const apiKey = body.apiKey || process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Missing API key' }));
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
