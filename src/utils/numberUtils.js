// Converte string de números separados por espaço para array
const parseNumberString = (str) => {
  return str
    .replace(/,/g, " ") // Substitui vírgulas por espaços
    .split(/\s+/) // Divide por um ou mais espaços
    .filter((num) => num.trim() !== "")
    .map((num) => {
      const trimmed = num.trim();
      return isNaN(trimmed) || trimmed === "" ? null : parseFloat(trimmed);
    })
    .filter((num) => num !== null);
};

// Encontra números que coincidem entre duas strings
export const findMatches = (strA, strB) => {
  const numbersA = parseNumberString(strA);
  const numbersB = parseNumberString(strB);

  const setA = new Set(numbersA);
  const matches = numbersB.filter((num) => setA.has(num));

  // Remove duplicatas e ordena
  return [...new Set(matches)].sort((a, b) => a - b);
};

// Calcula estatísticas
export const calculateStats = (strA, strB) => {
  const numbersA = parseNumberString(strA);
  const numbersB = parseNumberString(strB);
  const matches = findMatches(strA, strB);

  const totalA = numbersA.length;
  const totalB = numbersB.length;
  const matchesCount = matches.length;

  const totalNumbers = totalA + totalB;
  const matchPercentage =
    totalNumbers > 0
      ? (((matchesCount * 2) / totalNumbers) * 100).toFixed(1)
      : 0;

  return {
    totalA,
    totalB,
    matchesCount,
    matchPercentage: parseFloat(matchPercentage),
  };
};

// Valida se todos os valores em uma string são números
export const validateNumberString = (str) => {
  const numbers = str.split(/\s+/).filter((num) => num.trim() !== "");
  const invalid = numbers.filter((num) => isNaN(num.trim()));

  return {
    isValid: invalid.length === 0,
    validCount: numbers.length - invalid.length,
    invalidCount: invalid.length,
    invalidNumbers: invalid,
  };
};

// Formata uma string de números (normaliza espaços)
export const formatNumberString = (str) => {
  return str
    .replace(/,/g, " ") // Substitui vírgulas por espaços
    .replace(/\s+/g, " ") // Substitui múltiplos espaços por um
    .trim();
};

// Gera uma string de números aleatórios
export const generateRandomNumberString = (count, min = 0, max = 100) => {
  const numbers = Array(count)
    .fill(0)
    .map(() => Math.floor(Math.random() * (max - min + 1)) + min);
  return numbers.join(" ");
};
