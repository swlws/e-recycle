import Taro from '@tarojs/taro';

interface ChooseImageOption {
  count?: number;
  sizeType?: ('original' | 'compressed')[];
  sourceType?: ('album' | 'camera')[];
  limit?: number; // 单位B
  useCompress?: boolean;
}

/**
 * 选择图片
 * @param option
 * @returns
 */
export function chooseImages({
  count = 3,
  sizeType = ['original', 'compressed'],
  sourceType = ['album', 'camera'],
  limit = 1024 * 1024 * 2, // 2MB
  useCompress = true,
}: ChooseImageOption) {
  return new Promise((resolve, reject) => {
    Taro.chooseImage({
      count,
      sizeType,
      sourceType,
      success: (res) => {
        console.log(res);

        const list: string[] = [];
        for (const file of res.tempFiles) {
          // 检查图片大小是否超过限制
          if (file.size > limit) {
            Taro.showToast({ title: '图片大小超过限制', icon: 'none' });
            reject();
            return;
          } else {
            list.push(file.path);
          }
        }

        if (useCompress) {
          Promise.all(list.map(compressImage)).then(resolve);
        } else {
          resolve(list);
        }
      },
      fail: (reason) => {
        console.error(reason);
        reject();
      },
    });
  });
}

/**
 * 压缩图片
 * @param src
 * @param quality
 * @returns
 */
export function compressImage(src: string, quality = 80) {
  return new Promise((resolve) => {
    Taro.compressImage({
      src,
      quality,
      success: (res) => {
        resolve(res.tempFilePath);
      },
      fail: () => {
        resolve(src);
      },
    });
  });
}
