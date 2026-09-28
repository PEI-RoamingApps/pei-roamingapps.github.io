export function joinBase(basePath: string, path: string): string {
  let baseEnd = basePath.length;
  while (baseEnd > 0 && basePath.charCodeAt(baseEnd - 1) === 47) {
    baseEnd -= 1;
  }

  let pathStart = 0;
  while (pathStart < path.length && path.charCodeAt(pathStart) === 47) {
    pathStart += 1;
  }

  return `${basePath.slice(0, baseEnd)}/${path.slice(pathStart)}`;
}
