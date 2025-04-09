import { NumberKeyboard } from '@taroify/core';
import { forwardRef, useImperativeHandle, useState } from 'react';

interface NumberKeyboardWithKeysProps {
  onKeyPress?: (key: string) => void;
  onBackspace?: () => void;
}

/**
 * 数字键盘
 * @param props
 * @returns
 */
function NumberKeyboardWithKeys(props: NumberKeyboardWithKeysProps, ref: any) {
  const { onKeyPress } = props;

  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true);
    },
    hide: () => {
      setVisible(false);
    },
  }));

  const handleHideEvent = () => {
    setVisible(false);
  };

  return (
    <NumberKeyboard
      open={visible}
      onKeyPress={onKeyPress}
      onHide={handleHideEvent}
    ></NumberKeyboard>
  );
}

export default forwardRef(NumberKeyboardWithKeys);
