// src/utils/formatText.ts
export async function formatText(text: string, language: string): Promise<string> {
  try {
    const prettier = await import('prettier/standalone');

    if (language === 'json') {
    const parserBabel = await import('prettier/plugins/babel');
    const parserEstree = await import('prettier/plugins/estree');
    return prettier.format(text, {
      parser: 'json',
      plugins: [parserBabel, parserEstree],
    });
    } else if (language === 'xml') {
      const parserHtml = await import('prettier/plugins/html');
      return prettier.format(text, { parser: 'html', plugins: [parserHtml] });
    } else if (language === 'markdown') {
      const parserMarkdown = await import('prettier/plugins/markdown');
      return prettier.format(text, { parser: 'markdown', plugins: [parserMarkdown] });
    }
  } catch (err) {
    console.warn('Formatting failed:', err);
  }
  return text;
}
