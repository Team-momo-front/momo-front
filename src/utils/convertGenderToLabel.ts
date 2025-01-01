export const convertGenderToLabel = (gender: string): string => {
  switch (gender) {
    case 'male':
      return '남성';
    case 'female':
      return '여성';
    default:
      return '';
  }
};
