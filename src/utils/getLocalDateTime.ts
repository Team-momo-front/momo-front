export const getLocalDateTime = (date = new Date()) => {
  const offset = date.getTimezoneOffset() * 60000;
  const localISOTime = new Date(date.getTime() - offset)
    .toISOString()
    .slice(0, 16);
  return localISOTime;
};

export const getOneYearLaterDateTime = () => {
  const now = new Date();
  now.setFullYear(now.getFullYear() + 1);
  return getLocalDateTime(now);
};
