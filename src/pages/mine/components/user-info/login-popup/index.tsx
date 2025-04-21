// import { getUserProfile } from '@/bridge/user';
import { Button, Cell, Popup } from '@taroify/core';
import { forwardRef, useImperativeHandle, useState } from 'react';

interface LoginPopupProps {
  onSuccess?: (type: 'login' | 'update', info: { iv: string; encryptedData: string }) => void;
  onFail?: () => void;
}

function LoginPopup(props: LoginPopupProps, ref: any) {
  const [visible, setVisible] = useState(false);

  const onGetPhoneNumber = (e: any) => {
    console.log(e.detail);

    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      const { iv, encryptedData } = e.detail;
      props.onSuccess?.('login', { iv, encryptedData });
    } else {
      props.onFail?.();
    }

    setVisible(false);
  };

  // const updateUserProfile = () => {
  //   getUserProfile()
  //     .then(({ iv, encryptedData }) => {
  //       props.onSuccess?.('update', { iv, encryptedData });
  //     })
  //     .finally(() => {
  //       setVisible(false);
  //     });
  // };

  useImperativeHandle(ref, () => ({
    show() {
      setVisible(true);
    },
  }));

  return (
    <Popup
      open={visible}
      placement="bottom"
      style={{ height: '30%' }}
      onClose={() => setVisible(false)}
    >
      <Cell>
        {/* 这个组件是收费的，免费次数 1000 次 */}
        {/* https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/getPhoneNumber.html */}
        <Button
          style={{ width: '100%' }}
          openType="getPhoneNumber"
          onGetPhoneNumber={onGetPhoneNumber}
        >
          手机号码登录
        </Button>
      </Cell>

      {/* <Cell>
        <Button style={{ width: '100%' }} openType="getUserInfo" onClick={updateUserProfile}>
          更新头像、昵称
        </Button>
      </Cell> */}
    </Popup>
  );
}

export default forwardRef(LoginPopup);
