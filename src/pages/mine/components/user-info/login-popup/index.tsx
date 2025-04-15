import { Button, Popup } from '@taroify/core';
import { forwardRef, useImperativeHandle, useState } from 'react';

interface LoginPopupProps {
  onSuccess?: () => void;
  onFail?: () => void;
}

function LoginPopup(props: LoginPopupProps, ref: any) {
  const [visible, setVisible] = useState(false);

  const onGetPhoneNumber = (e: any) => {
    console.log(e.detail);

    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      props.onSuccess?.();
    } else {
      props.onFail?.();
    }

    setVisible(false);
  };

  useImperativeHandle(ref, () => ({
    show() {
      setVisible(true);
    },
  }));

  return (
    <Popup open={visible} placement="bottom" style={{ height: '30%' }}>
      <Button openType="getPhoneNumber" onGetPhoneNumber={onGetPhoneNumber}>
        手机号码登录
      </Button>
    </Popup>
  );
}

export default forwardRef(LoginPopup);
