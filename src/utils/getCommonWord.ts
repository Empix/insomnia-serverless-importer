import { splitCamelCase } from './splitCamelCase';

/*
Camel Case pode não ser o unico formato usado para criar nome das funções lambda
---> USAR NOME DO ARQUIVO YML SE EXISTIR
*/
export function getCommonWord(texts: string[]) {
  const words = texts.flatMap(splitCamelCase);

  //
  if (texts.length === 1) return words[words.length - 1];

  // TODO: Refazer com forEach para evitar isso \/
  const wordCounts: { [W: string]: number } = {
    [words[0]]: 1,
  };
  const commonWord = words.reduce((mostCommonWord, word) => {
    wordCounts[word] = ++wordCounts[word] || 1;
    if (wordCounts[word] > wordCounts[mostCommonWord]) return word;
    return mostCommonWord;
  });

  return commonWord;
}
