import { useRef, useState } from 'react';
import { Uploader } from '@taroify/core';
import { chooseImages } from '@/bridge/media';

import './index.scss';
import { IChooseImage } from '@/typings/bridge';
import NImagePreview from '@/components/n-image-preview';
import { View } from '@tarojs/components';

interface SnapshotProps {
  value?: IChooseImage[];
  readonly?: boolean;
  onChange?: (name: string, files: IChooseImage[]) => void;
}

export default function Snapshot(props: SnapshotProps) {
  const [files, setFiles] = useState<IChooseImage[]>(props.value || []);
  const nImagePreviewRef = useRef<any>(null);
  const maxFiles = 3;

  function onUpload() {
    if (props.readonly) return;

    chooseImages({
      count: maxFiles - files.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
    }).then((list) => {
      const newImages = [...files, ...list].slice(0, maxFiles);
      setFiles(newImages);
      props.onChange?.('snapshot', newImages);
    });
  }

  const onImageClick = () => {
    nImagePreviewRef.current?.open(files);
  };

  if (props.readonly && files.length === 0) return null;
  return (
    <>
      <Uploader
        style={{ padding: '8px 0 0 8px' }}
        value={files}
        removable={!props.readonly}
        multiple
        maxFiles={props.readonly ? files.length : maxFiles}
        onUpload={onUpload}
        onChange={setFiles}
      />

      <NImagePreview ref={nImagePreviewRef} />
    </>
  );
}
