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

/**
 * 格式化日期为相对时间
 * @param dateStr 日期字符串，格式：YYYY/MM/DD HH:mm
 * @returns 格式化后的字符串，如：今天 08:09
 */
export function formatRelativeDate(dateStr: string): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [datePart, timePart] = dateStr.split(' ');
  const targetDate = new Date(datePart);
  targetDate.setHours(0, 0, 0, 0);

  const diffDays = Math.floor((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  let relativeDayText = '';
  switch (diffDays) {
    case 0:
      relativeDayText = '今天';
      break;
    case 1:
      relativeDayText = '明天';
      break;
    case 2:
      relativeDayText = '后天';
      break;
    default: {
      if (diffDays < 0) {
        return `${datePart} ${timePart}`;
      }
      return `${datePart}(${diffDays}天后) ${timePart}`; // 如果超过后天，返回原始日期字符串
    }
  }

  return `${datePart}(${relativeDayText}) ${timePart}`;
}
