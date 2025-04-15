import { useState } from 'react';
import { Uploader } from '@taroify/core';
import { chooseImages } from '@/bridge/media';

import './index.scss';

interface SnapshotProps {}

export default function Snapshot(props: SnapshotProps) {
  const [files, setFiles] = useState<Uploader.File[]>([]);
  const maxFiles = 3;

  function onUpload() {
    chooseImages({
      count: maxFiles - files.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
    }).then((list) => {
      const newImages = [...files, ...list].slice(0, maxFiles);
      setFiles(newImages);
    });
  }

  return (
    <Uploader
      style={{ padding: '8px 0 0 8px' }}
      value={files}
      multiple
      maxFiles={maxFiles}
      onUpload={onUpload}
      onChange={setFiles}
    />
  );
}
