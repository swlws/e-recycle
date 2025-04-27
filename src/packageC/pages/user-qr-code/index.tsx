import api from '@/api';
import { saveQrCodeToPhotosAlbum } from '@/bridge/media';
import ChildPageLayout from '@/layout/child-page-layout';
import { Button, Cell, Image, NoticeBar, Space } from '@taroify/core';
import { View, Block } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { useState } from 'react';
import CacheMgr from '@/cache';
import { InfoOutlined } from '@taroify/icons';

export default function UserQrCode() {
  const [loading, setLoading] = useState(true);
  const [qrCode, setQrCode] = useState(() => {
    const qrCode = CacheMgr.user.value?.shareQrCode || '';
    if (!qrCode) return '';
    return 'https://' + qrCode;
  });

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

      <Space justify="center" style={{ margin: '32px 0 16px' }}>
        <Image mode="widthFix" placeholder="加载中..." src={qrCode} shape="rounded">
          {qrCode}
        </Image>
      </Space>

      <Space justify="center">
        <Button color="primary" block onClick={saveQrCode}>
          保存到相册
        </Button>
      </Space>
    </ChildPageLayout>
  );
}
