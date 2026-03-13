(function() {
  'use strict';

  function stripCodeFences(text) {
    var fence = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
    return fence ? fence[1] : text;
  }

  function normalizeQuotes(text) {
    return text
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/[\u2018\u2019]/g, '\'');
  }

  function removeTrailingCommas(text) {
    return text.replace(/,\s*([}\]])/g, '$1');
  }

  function extractBalanced(text, startIndex) {
    var open = text[startIndex];
    var close = open === '{' ? '}' : ']';
    var depth = 0;
    var inString = false;
    var escaped = false;

    for (var i = startIndex; i < text.length; i++) {
      var c = text[i];
      if (inString) {
        if (escaped) {
          escaped = false;
        } else if (c === '\\') {
          escaped = true;
        } else if (c === '"') {
          inString = false;
        }
        continue;
      }

      if (c === '"') {
        inString = true;
        continue;
      }

      if (c === open) depth++;
      if (c === close) depth--;
      if (depth === 0) return text.slice(startIndex, i + 1);
    }
    return null;
  }

  function extractJSONBlock(text) {
    if (!text) return null;
    var cleaned = normalizeQuotes(stripCodeFences(text));
    var firstObj = cleaned.indexOf('{');
    var firstArr = cleaned.indexOf('[');
    var start = -1;

    if (firstObj === -1 && firstArr === -1) return null;
    if (firstObj === -1) start = firstArr;
    else if (firstArr === -1) start = firstObj;
    else start = Math.min(firstObj, firstArr);

    return extractBalanced(cleaned, start);
  }

  function safeParseJSON(text) {
    var block = extractJSONBlock(text);
    if (!block) return { ok: false, error: 'No JSON block found', raw: text };

    var repaired = removeTrailingCommas(block);
    try {
      return { ok: true, value: JSON.parse(repaired), raw: block };
    } catch (e1) {
      try {
        var retry = removeTrailingCommas(repaired.replace(/\n\s*\n/g, '\n'));
        return { ok: true, value: JSON.parse(retry), raw: block };
      } catch (e2) {
        return { ok: false, error: e2.message, raw: block };
      }
    }
  }

  window.LensmorJSON = {
    safeParse: safeParseJSON
  };
})();
