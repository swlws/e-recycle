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
    { label: '下午', value: '15:00' },
    { label: '晚上', value: '18:00' },
  ];

  return [dateList, timeList];
}
