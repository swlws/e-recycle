import { Image, Popup } from '@taroify/core';
import { View } from '@tarojs/components';

import './index.scss';
import { forwardRef, useImperativeHandle, useState } from 'react';

interface ImagePreviewerProps {}

function ImagePreviewer(props: ImagePreviewerProps, ref: any) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState('');

  useImperativeHandle(ref, () => ({
    open: (image: string) => {
      setImage(image);
      setOpen(true);
    },
  }));

  return (
    <Popup
      open={open}
      style={{ padding: '64px' }}
      rounded
      lock={false}
      onClose={() => setOpen(false)}
    >
      <View>
        <Image className="image" src={image} />
      </View>
    </Popup>
  );
}

export default forwardRef(ImagePreviewer);
