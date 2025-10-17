export type AnyObject = Record<string, any>;

export function createAutoProxyObject<T extends AnyObject>(base: T): T {
  const handler: ProxyHandler<AnyObject> = {
    get(target, prop: string, receiver) {
      if (prop === "toJSON") {
        return () => target;
      }

      // Если свойства нет — создаём пустой объект и оборачиваем его в Proxy
      if (!(prop in target)) {
        target[prop] = {};
      }

      // Если значение — объект, возвращаем Proxy для него
      if (typeof target[prop] === "object" && target[prop] !== null) {
        target[prop] = new Proxy(target[prop], handler);
      }

      return Reflect.get(target, prop, receiver);
    },

    set(target, prop: string, value) {
      target[prop] = value;
      return true;
    },

    ownKeys(target) {
      return Reflect.ownKeys(target);
    },

    getOwnPropertyDescriptor(target, prop) {
        if (typeof prop === "string" || typeof prop === "number") {
            return Object.getOwnPropertyDescriptor(target, prop) || {
            configurable: true,
            enumerable: true,
            writable: true,
            value: target[prop],
            };
        }
        return Object.getOwnPropertyDescriptor(target, prop);
        }
    };

    return new Proxy(base, handler) as T;
}
