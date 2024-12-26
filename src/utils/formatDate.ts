export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const day = daysOfWeek[date.getDay()];
  const month = date.getMonth() + 1;
  const dayOfMonth = date.getDate();
  const hours = date.getHours();
  const period = hours >= 12 ? "오후" : "오전";
  const formattedHour = hours % 12 || 12;

  return `${month}/${dayOfMonth}(${day}) ${period} ${formattedHour}시`;
};
