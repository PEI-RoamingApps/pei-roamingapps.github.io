import { base } from 'astro:config/client';
import { joinBase } from './path-utils';

export function url(path: string): string {
  return joinBase(base, path);
}
