import { createAutoProxyObject } from "../tasks/task2/autoProxyObject";

describe('createAutoProxyObject', () => {
  it('should return the same type as input', () => {
    const base: Record<string, any> = { x: 10 };
    const proxied = createAutoProxyObject(base);
    
    expect(proxied).toBeDefined();
    expect(typeof proxied).toBe('object');
  });

  it('should allow getting existing properties', () => {
    const base = { x: 10 };
    const proxied = createAutoProxyObject(base);
    
    expect(proxied.x).toBe(10);
  });

  it('should allow setting new properties', () => {
    const base: Record<string, any> = { x: 10 };
    const proxied = createAutoProxyObject(base);
    
    proxied.y = 20;
    expect(proxied.y).toBe(20);
    expect(base.y).toBe(20);
  });

  it('should handle overwriting nested properties', () => {
    const base: Record<string, any> = { x: 10 };
    const proxied = createAutoProxyObject(base);
    
    proxied.a.b = 'first';
    proxied.a.b = 'second';
    
    expect(proxied.a.b).toBe('second');
  });

  it('should handle overwriting nested properties', () => {
    const base: Record<string, any> = { x: 10 };
    const proxied = createAutoProxyObject(base);
    
    proxied.a.b = 'first';
    proxied.a.b = 'second';
    
    expect(proxied.a.b).toBe('second');
  });

it('should handle different property types', () => {
    const base: Record<string, any> = { x: 10 };
    const proxied = createAutoProxyObject(base);
    
    proxied.stringProp = 'hello';
    proxied.numberProp = 42;
    proxied.booleanProp = true;
    proxied.nullProp = null;
    proxied.undefinedProp = undefined;
    proxied.arrayProp = [1, 2, 3];
    
    expect(proxied.stringProp).toBe('hello');
    expect(proxied.numberProp).toBe(42);
    expect(proxied.booleanProp).toBe(true);
    expect(proxied.nullProp).toBe(null);
    expect(proxied.undefinedProp).toBe(undefined);
    expect(Array.isArray(proxied.arrayProp)).toBe(true);
    expect(proxied.arrayProp[0]).toBe(1);
    expect(proxied.arrayProp[1]).toBe(2);
    expect(proxied.arrayProp[2]).toBe(3);
  });
});