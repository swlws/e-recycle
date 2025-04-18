import { getUserProfile } from '@/bridge/user';
import { Button, Cell, Popup } from '@taroify/core';
import { forwardRef, useImperativeHandle, useState } from 'react';
import CacheMgr from '@/cache';

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

  const updateUserProfile = () => {
    getUserProfile()
      .then((userInfo) => {
        const oldUserProfile = CacheMgr.user.value;
        CacheMgr.user.setValue({ ...oldUserProfile, ...userInfo });
        props.onSuccess?.();
      })
      .finally(() => {
        setVisible(false);
      });
  };

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
        <Button
          style={{ width: '100%' }}
          openType="getPhoneNumber"
          onGetPhoneNumber={onGetPhoneNumber}
        >
          手机号码登录
        </Button>
        <Button style={{ width: '100%' }} openType="getUserInfo" onClick={updateUserProfile}>
          完善头像、昵称
        </Button>
      </Cell>
    </Popup>
  );
}

export default forwardRef(LoginPopup);
