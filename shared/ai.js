(function() {
  'use strict';

  var DEFAULT_TIMEOUT_MS = 60000;
  var DEFAULT_RETRIES = 2;

  function estimateTokensFromMessages(messages) {
    try {
      var raw = JSON.stringify(messages || []);
      return Math.max(1, Math.round(raw.length / 4));
    } catch (e) {
      return 0;
    }
  }

  function getPricing(model) {
    if (window.LENSMOR_MODEL_PRICING && window.LENSMOR_MODEL_PRICING[model]) {
      return window.LENSMOR_MODEL_PRICING[model];
    }
    return null;
  }

  async function callAnthropic(options) {
    var apiBase = (window.LENSMOR_API_BASE || '').replace(/\/$/, '');
    var endpoint = apiBase + '/api/anthropic';
    var retries = options.retries !== undefined ? options.retries : DEFAULT_RETRIES;
    var timeoutMs = options.timeoutMs || DEFAULT_TIMEOUT_MS;

    var payload = {
      model: options.model,
      max_tokens: options.max_tokens || 1024,
      messages: options.messages
    };

    if (options.apiKey) payload.apiKey = options.apiKey;
    if (options.temperature !== undefined) payload.temperature = options.temperature;
    if (options.metadata) payload.metadata = options.metadata;

    var attempt = 0;
    var lastErr = null;

    while (attempt <= retries) {
      attempt++;
      var controller = new AbortController();
      var timer = setTimeout(function() { controller.abort(); }, timeoutMs);

      try {
        var resp = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal
        });
        clearTimeout(timer);

        if (!resp.ok) {
          var errText = '';
          try { errText = await resp.text(); } catch (e) {}
          var retryable = resp.status === 429 || resp.status >= 500;
          if (retryable && attempt <= retries + 1) {
            await new Promise(function(r) { return setTimeout(r, 500 * attempt); });
            continue;
          }
          throw new Error(errText || ('API error ' + resp.status));
        }

        var data = await resp.json();
        return data;
      } catch (e) {
        clearTimeout(timer);
        lastErr = e;
        var retry = attempt <= retries + 1 && (e.name === 'AbortError' || /Network|timeout/i.test(e.message));
        if (retry) {
          await new Promise(function(r) { return setTimeout(r, 500 * attempt); });
          continue;
        }
        break;
      }
    }

    throw lastErr || new Error('Failed to call AI');
  }

  function extractTextFromResponse(data) {
    if (!data) return '';
    if (typeof data === 'string') return data;
    if (data.content && data.content[0] && data.content[0].text) return data.content[0].text;
    if (data.message && data.message.content && data.message.content[0] && data.message.content[0].text) return data.message.content[0].text;
    return '';
  }

  function estimateCost(model, inputTokens, outputTokens) {
    var pricing = getPricing(model);
    if (!pricing) return null;
    var inputCost = (inputTokens || 0) * (pricing.in / 1000000);
    var outputCost = (outputTokens || 0) * (pricing.out / 1000000);
    return Math.round((inputCost + outputCost) * 10000) / 10000;
  }

  window.LensmorAI = {
    callAnthropic: callAnthropic,
    extractText: extractTextFromResponse,
    estimateTokens: estimateTokensFromMessages,
    estimateCost: estimateCost
  };
})();
