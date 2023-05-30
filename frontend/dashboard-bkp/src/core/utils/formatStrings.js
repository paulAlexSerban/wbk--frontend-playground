export default function formatString(input) {
  const words = input.split('--');
  const formattedWords = words.map((word) => {
    const wordParts = word.split('-');
    const capitalizedParts = wordParts.map((part) => part.charAt(0).toUpperCase() + part.slice(1));
    return capitalizedParts.join(' ');
  });

  return formattedWords.join(' - ');
}