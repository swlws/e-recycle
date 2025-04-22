import { useRef, useState } from 'react';
import { Uploader } from '@taroify/core';
import { chooseImages } from '@/bridge/media';
import { IChooseImage } from '@/typings/bridge';
import NImagePreview from '@/components/n-image-preview';

import './index.scss';

interface SnapshotProps {
  value?: IChooseImage[];
  readonly?: boolean;
  onChange?: (name: string, files: IChooseImage[]) => void;
}

export default function Snapshot(props: SnapshotProps) {
  console.log(props);
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

  return (
    <>
      <Uploader
        style={{ padding: '8px 0 0 8px' }}
        value={files}
        removable={!props.readonly}
        multiple
        maxFiles={maxFiles}
        onUpload={onUpload}
        onChange={setFiles}
      >
        {files.map((image) => (
          <Uploader.Image
            key={image.url}
            url={image.url}
            onRemove={() => setFiles(files.filter((item) => item !== image))}
          ></Uploader.Image>
        ))}

        {!props.readonly && <Uploader.Upload />}
      </Uploader>

      {/* <NImagePreview ref={nImagePreviewRef} /> */}
    </>
  );
}
