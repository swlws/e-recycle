import { useCallback, useRef, useState } from 'react';
import { Avatar, Cell, Flex, Image, Uploader } from '@taroify/core';
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
  const [files, setFiles] = useState<IChooseImage[]>(props.value || []);
  const nImagePreviewRef = useRef<any>(null);
  const maxFiles = 3;

  const onUpload = useCallback(() => {
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
  }, []);

  const onImageClick = () => {
    nImagePreviewRef.current?.open(files.map((item) => item.url));
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
      ></Uploader>

      <Cell className="snapshot--readonly">
        {files.length > 0 && (
          <Flex className="be-form-publish-task__snapshot" onClick={onImageClick}>
            {files.map((item, index) => (
              <Flex.Item key={index}>
                <Avatar src={item.url} alt="" size="large" />
              </Flex.Item>
            ))}
          </Flex>
        )}
      </Cell>

      <NImagePreview ref={nImagePreviewRef} />
    </>
  );
}
