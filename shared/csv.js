(function() {
  'use strict';

  function stripBOM(text) {
    if (!text) return '';
    return text.charCodeAt(0) === 0xFEFF ? text.slice(1) : text;
  }

  function parseCSV(text) {
    text = stripBOM(text || '');
    var rows = [];
    var row = [];
    var field = '';
    var inQuotes = false;
    var i = 0;

    while (i < text.length) {
      var c = text[i];
      if (inQuotes) {
        if (c === '"') {
          if (text[i + 1] === '"') {
            field += '"';
            i++;
          } else {
            inQuotes = false;
          }
        } else {
          field += c;
        }
      } else {
        if (c === '"') {
          inQuotes = true;
        } else if (c === ',') {
          row.push(field);
          field = '';
        } else if (c === '\r') {
          if (text[i + 1] === '\n') i++;
          row.push(field);
          field = '';
          if (row.length > 1 || row[0] !== '') rows.push(row);
          row = [];
        } else if (c === '\n') {
          row.push(field);
          field = '';
          if (row.length > 1 || row[0] !== '') rows.push(row);
          row = [];
        } else {
          field += c;
        }
      }
      i++;
    }

    row.push(field);
    if (row.length > 1 || row[0] !== '') rows.push(row);

    if (rows.length === 0) return { headers: [], rows: [] };
    var headers = rows[0].map(function(h) { return String(h || '').trim(); });
    var data = rows.slice(1).filter(function(r) {
      return r.some(function(cell) { return String(cell || '').trim() !== ''; });
    });

    return { headers: headers, rows: data };
  }

  function stringifyCSV(headers, rows) {
    var all = [];
    if (headers && headers.length) all.push(headers);
    (rows || []).forEach(function(r) { all.push(r); });

    return all.map(function(row) {
      return row.map(function(v) {
        var s = v === null || v === undefined ? '' : String(v);
        if (s.indexOf('"') !== -1) s = s.replace(/"/g, '""');
        if (/[",\n\r]/.test(s)) s = '"' + s + '"';
        return s;
      }).join(',');
    }).join('\n');
  }

  window.LensmorCSV = {
    parse: parseCSV,
    stringify: stringifyCSV
  };
})();
