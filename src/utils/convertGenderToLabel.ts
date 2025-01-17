export const convertGenderToLabel = (gender: string): string => {
  switch (gender) {
    case 'MALE':
      return '남성';
    case 'FEMALE':
      return '여성';
    default:
      return '';
  }
};
