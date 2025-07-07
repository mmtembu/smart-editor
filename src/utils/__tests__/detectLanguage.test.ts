// src/utils/__tests__/detectLanguage.test.ts
import { detectLanguage } from '../detectLanguage';

describe('detectLanguage', () => {
  it('detects JSON from object', () => {
    expect(detectLanguage('{"a":1}')).toBe('json');
  });

  it('detects JSON from array', () => {
    expect(detectLanguage('[1, 2, 3]')).toBe('json');
  });

  it('detects XML', () => {
    expect(detectLanguage('<note><to>Tove</to></note>')).toBe('xml');
  });

  it('detects Markdown by symbols', () => {
    expect(detectLanguage('# Heading')).toBe('markdown');
    expect(detectLanguage('```code```')).toBe('markdown');
  });

  it('detects log content', () => {
    expect(detectLanguage('ERROR Something failed')).toBe('log');
    expect(detectLanguage('DEBUG Trace logs here')).toBe('log');
    expect(detectLanguage('INFO Startup')).toBe('log');
  });

  it('detects plaintext fallback', () => {
    expect(detectLanguage('Hello, world!')).toBe('plaintext');
    expect(detectLanguage('42')).toBe('plaintext');
    expect(detectLanguage('This is just some regular sentence.')).toBe('plaintext');
  });

  it('handles empty string safely', () => {
    expect(detectLanguage('')).toBe('plaintext');
    expect(detectLanguage('   ')).toBe('plaintext');
  });

  it('handles malformed JSON', () => {
    expect(detectLanguage('{invalid:')).toBe('json');
  });

  it('handles broken XML', () => {
    expect(detectLanguage('<openTag><noClose')).toBe('xml');
  });
});
