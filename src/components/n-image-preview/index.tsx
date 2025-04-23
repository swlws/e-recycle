import { Image, Popup, Swiper } from '@taroify/core';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { View } from '@tarojs/components';
import { Cross } from '@taroify/icons';

import './index.scss';

interface ImagePreviewerProps {}

function ImagePreviewer(props: ImagePreviewerProps, ref: any) {
  const [open, setOpen] = useState(false);
  const [imageList, setImageList] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  useImperativeHandle(ref, () => ({
    open: (list: string[]) => {
      setImageList(list);
      setOpen(true);
    },
  }));

  return (
    <Popup
      open={open}
      placement="center"
      onClose={() => setOpen(false)}
      className="image-preview-popup"
    >
      <View className="image-preview-container">
        <View className="close-button" onClick={() => setOpen(false)}>
          <Cross size="24" color="#fff" />
        </View>
        <View className="swiper-container">
          <Swiper
            className="image-swiper"
            value={index}
            lazyRender
            onChange={setIndex}
          >
            <Swiper.Indicator />
            {imageList.map((image, idx) => (
              <Swiper.Item key={idx}>
                <Image
                  className="preview-image"
                  src={image}
                  mode="aspectFit"
                />
              </Swiper.Item>
            ))}
          </Swiper>
        </View>
      </View>
    </Popup>
  );
}

export default forwardRef(ImagePreviewer);
