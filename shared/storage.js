(function() {
  'use strict';

  var PREFIX = 'ts-tools:';

  function safeParse(val, fallback) {
    try { return JSON.parse(val); } catch (e) { return fallback; }
  }

  function createStore(tool) {
    var base = PREFIX + tool + ':';
    return {
      get: function(key, fallback) {
        var v = localStorage.getItem(base + key);
        if (v === null || v === undefined) return fallback;
        return safeParse(v, fallback);
      },
      set: function(key, value) {
        try { localStorage.setItem(base + key, JSON.stringify(value)); } catch (e) {}
      },
      remove: function(key) {
        try { localStorage.removeItem(base + key); } catch (e) {}
      },
      clear: function() {
        clearByPrefix(base);
      }
    };
  }

  function clearByPrefix(prefix) {
    try {
      var keys = Object.keys(localStorage);
      keys.forEach(function(k) { if (k.indexOf(prefix) === 0) localStorage.removeItem(k); });
    } catch (e) {}
  }

  function clearAllTools() {
    clearByPrefix(PREFIX);
  }

  window.LensmorStore = {
    createStore: createStore,
    clearByPrefix: clearByPrefix,
    clearAll: clearAllTools
  };
})();
