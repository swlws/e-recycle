import api from '@/api';
import { saveQrCodeToPhotosAlbum } from '@/bridge/media';
import ChildPageLayout from '@/layout/child-page-layout';
import { Button, Flex, Image, NoticeBar, Space } from '@taroify/core';
import { View } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { useState } from 'react';
import { InfoOutlined } from '@taroify/icons';

export default function UserQrCode() {
  const [loading, setLoading] = useState(true);
  const [qrCode, setQrCode] = useState('');

  useLoad(() => {
    if (qrCode) return;

    api.share
      .getUserShareQrCode()
      .then(({ r0, res }) => {
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
      <View style={{ marginBottom: '16px' }}>
        <NoticeBar style={{ color: '#fff', background: '#4CAF50' }} scrollable>
          <NoticeBar.Icon>
            <InfoOutlined />
          </NoticeBar.Icon>
          让绿色回收成为全民习惯，推动低碳环保，实现资源循环利用，助力可持续发展。
        </NoticeBar>
      </View>

      <Flex justify="center" align="center">
        <Image
          mode="widthFix"
          placeholder="加载中..."
          src={qrCode}
          shape="rounded"
          style={{ width: '326px', height: '326px' }}
        ></Image>
      </Flex>

      <Space justify="center" style={{ marginTop: '16px' }}>
        <Button color="primary" block onClick={saveQrCode}>
          保存到相册
        </Button>
      </Space>
    </ChildPageLayout>
  );
}
