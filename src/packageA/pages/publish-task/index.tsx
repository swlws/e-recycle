import { useState } from 'react';
import ChildPageLayout from '@/layout/child-page-layout';
import BeFormPublishTask from '@/business/form-publish-task';
import { ITaskInfo } from '@/typings/task';
import { Button, Flex, Loading } from '@taroify/core';
import api from '@/api';
import CacheMgr from '@/cache';

import Taro, { useLoad } from '@tarojs/taro';
import { batchUploadImage } from '@/bridge/media';
import { requestSubscribeMessageWhenUserPublishTask } from '@/bridge/notify';
import { getCurrentInstance } from '@tarojs/runtime';

import './index.scss';

/**
 * 校验任务信息
 * @param taskInfo
 * @returns
 */
function validateTaskInfo(taskInfo: Partial<ITaskInfo>) {
  if (!taskInfo?.location?.longitude) {
    Taro.showToast({ title: '选择收件地址' });
    return false;
  }

  return true;
}

export default function ChildPage() {
  const [loading, setLoading] = useState(true);
  const [formValue, setFormValue] = useState<Partial<ITaskInfo>>(() => {
    const { nickName, phoneNumber } = CacheMgr.user.value;
    return {
      person: nickName,
      phoneNumber,
    };
  });

  useLoad(() => {
    handleParamsFromRouter();

    setLoading(false);
  });

  const handleParamsFromRouter = () => {
    const good = getCurrentInstance().router?.params?.good as string;
    if (!good) return;
    setFormValue((oldValue) => {
      return {
        ...oldValue,
        goods: [good],
      };
    });
  };

  const onSubmit = async () => {
    if (!validateTaskInfo(formValue)) return;

    await requestSubscribeMessageWhenUserPublishTask();

    // 上传图片
    const snapshot = await batchUploadImage(formValue.snapshot);

    // 创建任务
    api.task.createTask({ ...formValue, snapshot }).then((res) => {
      if (res.r0 !== 0) return;
      Taro.showToast({ title: '发布成功', icon: 'success' });

      setTimeout(() => {
        Taro.navigateBack();
      }, 500);
    });
  };

  return (
    <ChildPageLayout>
      {loading ? (
        <Loading />
      ) : (
        <BeFormPublishTask formValue={formValue} onChange={setFormValue}>
          <Flex className="publish-task__button-group " gutter={10}>
            <Flex.Item>
              <Button block variant="outlined" color="primary" onClick={onSubmit}>
                发布任务
              </Button>
            </Flex.Item>
          </Flex>
        </BeFormPublishTask>
      )}
    </ChildPageLayout>
  );
}
