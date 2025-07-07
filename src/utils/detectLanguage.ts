// src/utils/detectLanguage.ts
export function detectLanguage(text: string): string {
  const trimmed = text.trim();
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) return 'json';
  if (trimmed.startsWith('<')) return 'xml';
  if (trimmed.includes('#') || trimmed.includes('```')) return 'markdown';
  if (/\b(ERROR|INFO|DEBUG)\b/.test(trimmed)) return 'log';
  return 'plaintext';
}
