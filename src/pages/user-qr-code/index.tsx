import api from '@/api';
import { saveQrCodeToPhotosAlbum } from '@/bridge/media';
import ChildPageLayout from '@/layout/child-page-layout';
import { Button, Cell, Image, Space } from '@taroify/core';
import { View, Block } from '@tarojs/components';
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
        setQrCode('https://' + res);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  const saveQrCode = () => {
    saveQrCodeToPhotosAlbum(qrCode);
  };

  return (
    <ChildPageLayout>
      <Space size={16} justify="center">
        <Image mode="widthFix" placeholder="加载中..." src={qrCode} shape="rounded">
          {qrCode}
        </Image>
      </Space>

      <Block>
        <Space direction="vertical" fill>
          <Button color="primary" block onClick={saveQrCode}>
            保存到相册
          </Button>
        </Space>
      </Block>
    </ChildPageLayout>
  );
}
