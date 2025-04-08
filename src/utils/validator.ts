/**
 * 手机号验证
 * @param phoneNumber
 * @returns
 */
export function phoneNumberValidator(phoneNumber: string) {
  // 去除所有空白符
  phoneNumber = phoneNumber.replace(/\s/g, '');
  const phoneNumberRegex = /^1[3-9]\d{9}$/;
  return phoneNumberRegex.test(phoneNumber);
}
