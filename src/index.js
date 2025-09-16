let currentEffect = null;

export function reactive(obj) {
  const listeners = new Map();

  return new Proxy(obj, {
    get(target, prop) {
      if (currentEffect) {
        if (!listeners.has(prop)) listeners.set(prop, new Set());
        listeners.get(prop).add(currentEffect);
      }

      const value = target[prop];

      if (Array.isArray(value) && !value._reactive) {
        ["push", "pop", "shift", "unshift", "splice"].forEach((method) => {
          const original = Array.prototype[method];
          value[method] = function (...args) {
            const result = original.apply(this, args);
            if (listeners.has(prop)) {
              listeners.get(prop).forEach((effect) => effect.run());
            }
            return result;
          };
        });
        value._reactive = true;
      }

      return value;
    },
    set(target, prop, value) {
      target[prop] = value;
      if (listeners.has(prop)) {
        listeners.get(prop).forEach((effect) => effect.run());
      }
      return true;
    },
  });
}

export function effect(fn) {
  const e = {
    cleanup: null,
    run() {
      if (e.cleanup) e.cleanup();
      currentEffect = e;
      const result = fn();
      currentEffect = null;
      if (typeof result === "function") {
        e.cleanup = result;
      }
    },
  };
  e.run();
  return e;
}
