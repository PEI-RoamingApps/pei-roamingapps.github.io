import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { describe, expect, it } from 'vitest';

const dist = resolve('dist');

function filesBelow(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesBelow(path) : [path];
  });
}

const htmlFiles = filesBelow(dist).filter((file) => file.endsWith('.html'));

function contentRoutes(collection: 'milestones' | 'minutes'): string[] {
  const directory = resolve('src/content', collection);
  return readdirSync(directory)
    .filter((name) => name.endsWith('.md'))
    .filter((name) => {
      if (collection !== 'minutes') return true;
      return !/^scheduled:\s*true\s*$/m.test(readFileSync(join(directory, name), 'utf8'));
    })
    .map((name) => `/${collection}/${name.replace(/\.md$/, '')}`);
}

function routeFor(file: string): string {
  const outputPath = relative(dist, file).split(sep).join('/');
  if (outputPath === 'index.html') return '/';
  return `/${outputPath.replace(/\/index\.html$/, '')}`;
}

function localTargetExists(pageFile: string, reference: string): boolean {
  if (/^(?:[a-z]+:|#|\/\/)/i.test(reference)) return true;

  const cleanReference = decodeURIComponent(reference.split(/[?#]/, 1)[0]);
  if (!cleanReference) return true;

  const target = cleanReference.startsWith('/')
    ? join(dist, cleanReference)
    : resolve(dirname(pageFile), cleanReference);

  return existsSync(target) || existsSync(join(target, 'index.html'));
}

describe('production build', () => {
  it('generates every expected content route', () => {
    const expectedRoutes = [
      '/',
      '/documentation',
      '/milestones',
      '/minutes',
      '/project',
      '/team',
      ...contentRoutes('milestones'),
      ...contentRoutes('minutes'),
    ].sort();

    expect(htmlFiles.map(routeFor).sort()).toEqual(expectedRoutes);
  });

  it.each(htmlFiles)('%s has essential document metadata and one primary heading', (file) => {
    const html = readFileSync(file, 'utf8');
    expect(html).toMatch(/<title>[^<]+<\/title>/);
    expect(html).toMatch(/<meta name="description" content="[^"]+">/);
    expect(html).toMatch(/<link rel="canonical" href="https:\/\/pei-alinha\.github\.io\//);
    expect(html.match(/<h1\b/g)).toHaveLength(1);
  });

  it.each(htmlFiles)('%s does not reference missing local pages or assets', (file) => {
    const html = readFileSync(file, 'utf8');
    const references = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
    const missing = references.filter((reference) => !localTargetExists(file, reference));
    expect(missing).toEqual([]);
  });
});
