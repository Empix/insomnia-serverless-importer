export function splitCamelCase(text: string): string[] {
  const separatedWords = text.replace(/([a-z])([A-Z])/g, '$1 $2');
  const splitedWords = separatedWords.split(' ');

  return splitedWords;
}
