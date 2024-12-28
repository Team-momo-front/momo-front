export const formatPhoneNumber = (phone: string): string => {
  const formattedPhoneNumber = phone.replace(/[^\d]/g, '');

  if (formattedPhoneNumber.length <= 3) return formattedPhoneNumber;
  if (formattedPhoneNumber.length <= 7) return `${formattedPhoneNumber.slice(0, 3)}-${formattedPhoneNumber.slice(3)}`;
  return `${formattedPhoneNumber.slice(0, 3)}-${formattedPhoneNumber.slice(3, 7)}-${formattedPhoneNumber.slice(7, 11)}`;
};
