import { useCallback, useRef, useState } from 'react';
import { Cell, Flex, Image, Uploader } from '@taroify/core';
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

  // 编辑模式
  if (!props.readonly) {
    return (
      <Uploader
        style={{ padding: '8px 0 0 8px' }}
        value={files}
        removable={!props.readonly}
        multiple
        maxFiles={maxFiles}
        onUpload={onUpload}
        onChange={setFiles}
      ></Uploader>
    );
  }

  // 只读模式
  return (
    <>
      <Cell className="snapshot--readonly">
        {files.length > 0 && (
          <Flex onClick={onImageClick}>
            {files.map((item, index) => (
              <Flex.Item key={index}>
                <Image
                  src={item.url}
                  alt=""
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    padding: "'0 16px'",
                  }}
                />
              </Flex.Item>
            ))}
          </Flex>
        )}
      </Cell>

      <NImagePreview ref={nImagePreviewRef} />
    </>
  );
}
