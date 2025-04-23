import { URL_PREFIX } from '@/api/request';
import { IChooseImage } from '@/typings/bridge';
import Taro from '@tarojs/taro';
import CacheMgr from '@/cache';

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
}: ChooseImageOption): Promise<IChooseImage[]> {
  return new Promise((resolve, reject) => {
    Taro.chooseImage({
      count,
      sizeType,
      sourceType,
      success: (res) => {
        console.log(res);

        const list: IChooseImage[] = [];
        for (const file of res.tempFiles) {
          // 检查图片大小是否超过限制
          if (file.size > limit) {
            Taro.showToast({ title: '图片大小超过限制', icon: 'none' });
            reject();
            return;
          } else {
            list.push({ url: file.path });
          }
        }

        if (useCompress) {
          Promise.all(list.map((item) => compressImage(item.url))).then((list) => {
            resolve(list.map((url) => ({ url })));
          });
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
export function compressImage(src: string, quality = 80): Promise<string> {
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

/**
 * 保存二维码到相册
 * @param qrCodeUrl
 */
export function saveQrCodeToPhotosAlbum(qrCodeUrl: string) {
  Taro.downloadFile({
    url: qrCodeUrl,
    success: (res) => {
      Taro.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success: () => Taro.showToast({ title: '保存成功' }),
      });
    },
  });
}

type IUploadImage = { url: string };

/**
 * 上传图片
 * @param info
 * @returns
 */
export function uploadOneImage(info: IUploadImage): Promise<{
  r0: number;
  r1: string;
  res: any;
}> {
  if (!info.url) {
    return Promise.resolve({ r0: 0, r1: '', res: '' });
  }

  // cos 桶内的图片不处理
  if (info.url.startsWith('https://swlws')) {
    return Promise.resolve({ r0: 0, r1: '', res: info.url });
  }

  const uid = CacheMgr.user.value?._id || '';
  return new Promise((resolve, reject) => {
    Taro.uploadFile({
      url: URL_PREFIX + '/api/file/upload',
      filePath: info.url,
      name: 'file',
      header: { 'X-UID': uid },
      success: (res) => {
        if (res.errMsg === 'uploadFile:ok') {
          const data = JSON.parse(res.data);
          if (data.r0 !== 0) {
            reject(data);
          } else {
            resolve(data);
          }
        } else {
          reject(res);
        }
      },
      fail: (err) => {
        console.error(err);
        reject(err);
      },
    });
  });
}

/**
 * 批量上传图片
 * @param imageList
 * @returns
 */
export function batchUploadImage(imageList?: IUploadImage[]): Promise<{ url: string }[]> {
  if (!Array.isArray(imageList) || imageList.length === 0) return Promise.resolve([]);
  return Promise.all(imageList.map((item) => uploadOneImage(item))).then((list) => {
    return list.map((item) => ({ url: item.res }));
  });
}

/**
 * 调用电话
 * @param phone
 */
export function callPhone(phone: string) {
  Taro.makePhoneCall({ phoneNumber: phone });
}
