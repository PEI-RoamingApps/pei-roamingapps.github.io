import { describe, expect, it } from 'vitest';
import { joinBase } from '../../src/lib/path-utils';

describe('joinBase', () => {
  it.each([
    ['/', '/', '/'],
    ['/', '/minutes', '/minutes'],
    ['/', 'minutes', '/minutes'],
    ['/microsite/', '/minutes', '/microsite/minutes'],
    ['/microsite', 'documents/report.pdf', '/microsite/documents/report.pdf'],
  ])('joins base %s and path %s', (base, path, expected) => {
    expect(joinBase(base, path)).toBe(expected);
  });

  it('normalizes repeated boundary slashes', () => {
    expect(joinBase('/microsite///', '///team')).toBe('/microsite/team');
  });
});
