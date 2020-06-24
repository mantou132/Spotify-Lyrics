export function raw(arr: TemplateStringsArray, ...args: any[]) {
  return arr.reduce((prev, current, index) => prev + (args[index - 1] || '') + current);
}
export const svg = raw;
export const css = raw;

export function appendStyle(s: string) {
  const style = document.createElement('style');
  style.textContent = s;
  document.head.append(style);
}
