/**
 * 手机号码格式化
 * @param phoneNumber
 * @returns
 */
export function phoneNumberFormatter(phoneNumber: string) {
  const phoneNumberRegex = /^(\d{3})(\d{4})(\d{4})$/;
  return phoneNumber.replace(phoneNumberRegex, '$1 $2 $3');
}
