/**
 * 格式化日期为 YYYY-MM-DD 格式
 * @param date
 * @returns
 */
export function formatDateToYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
}

/**
 * 添加 N 天
 * @param date
 * @param step
 * @returns
 */
export function addNDay(date: Date, step = 0): Date {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + step);
  return newDate;
}
