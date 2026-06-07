export const formatCharacterName = (characterName: string) => {
  const nameParts = characterName.split(', ');

  if (nameParts.length === 1) {
    return nameParts[0];
  }

  if (nameParts.length === 2) {
    return `${nameParts[1]} ${nameParts[0]}`;
  }

  if (nameParts.length === 3) {
    return `${nameParts[2]} ${nameParts[0]} ${nameParts[1]}`;
  }

  return nameParts.join(' ');
};
