export function pluck<T, K extends keyof T>(key: K) {
  return (object: T) => object[key];
}

export function keyEquals<T, K extends keyof T>(key: K, value: T[K]) {
  return (object: T) => object[key] === value;
}

