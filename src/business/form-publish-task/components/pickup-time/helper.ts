import { addNDay, formatDateToYYMMDD } from '@/utils/date';

function getRecentDateList(): string[] {
  const now = new Date();
  const dateList: string[] = [];

  for (let i = 0; i < 7; i++) {
    dateList.push(formatDateToYYMMDD(addNDay(now, i)));
  }

  return dateList;
}

/**
 * 选择器选项
 * @returns
 */
export function getPickerOption() {
  const dayLabelList = ['今天', '明天', '后天'];
  const dateList = getRecentDateList().map((date, index) => {
    return { label: dayLabelList[index] || date, value: date };
  });

  const timeList = [
    { label: '上午', value: '09:00' },
    { label: '中午', value: '12:00' },
    { label: '下午', value: '15:00' },
    { label: '傍晚', value: '18:00' },
    { label: '晚上', value: '21:00' },
  ];

  return [dateList, timeList];
}

/**
 * 获取默认的取货时间
 * 规则：
 * 1. 当天 09:00 之前，取货时间为当天 09:00
 * 2. 当天 12:00 之前，取货时间为当天 12:00
 * 2. 当天 15:00 之前，取货时间为当天 15:00
 * 3. 当天 18:00 之前，取货时间为当天 18:00
 * 3. 当天 21:00 之前，取货时间为当天 21:00
 * 4. 当天 21:00 之后，取货时间为明天 09:00
 * @returns
 */
export function getDefaultPickTime(): string {
  const now = new Date();
  const hour = now.getHours();
  if (hour < 9) {
    return `${formatDateToYYMMDD(now)} 09:00`;
  } else if (hour < 12) {
    return `${formatDateToYYMMDD(now)} 12:00`;
  } else if (hour < 15) {
    return `${formatDateToYYMMDD(now)} 15:00`;
  } else if (hour < 18) {
    return `${formatDateToYYMMDD(now)} 18:00`;
  } else if (hour < 21) {
    return `${formatDateToYYMMDD(now)} 21:00`;
  } else {
    return `${formatDateToYYMMDD(addNDay(now, 1))} 09:00`;
  }
}
