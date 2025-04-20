import api from '@/api';
import ChildPageLayout from '@/layout/child-page-layout';
import { Image } from '@taroify/core';
import { View } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { useState } from 'react';

export default function UserQrCode() {
  const [loading, setLoading] = useState(true);
  const [qrCode, setQrCode] = useState('');

  useLoad(() => {
    console.log('useLoad qrCode');
    api.share
      .getUserShareQrCode()
      .then(({ r0, res }) => {
        console.log('qrCode', res);
        if (r0 !== 0) return;
        setQrCode('//' + res);
      })
      .finally(() => {
        setLoading(false);
      });
  });
  return <ChildPageLayout>{!loading && <Image src={qrCode}>{qrCode}</Image>}</ChildPageLayout>;
}
