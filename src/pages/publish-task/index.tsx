import { useState } from 'react';
import ChildPageLayout from '@/layout/child-page-layout';
import BeFormPublishTask from '@/business/form-publish-task';
import { ITaskInfo } from '@/typings/task';
import { Button, Flex } from '@taroify/core';
import api from '@/api';
import CacheMgr from '@/cache';

import './index.scss';
import Taro from '@tarojs/taro';
import { batchUploadImage } from '@/bridge/media';
import { requestSubscribeMessageWhenPublishTask } from '@/bridge/notify';

export default function ChildPage() {
  const [formValue, setFormValue] = useState<Partial<ITaskInfo>>(() => {
    const { nickName, phoneNumber } = CacheMgr.user.value;
    return {
      person: nickName,
      phoneNumber,
    };
  });

  const onSubmit = async () => {
    await requestSubscribeMessageWhenPublishTask();

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
      <BeFormPublishTask formValue={formValue} onChange={setFormValue}>
        <Flex className="publish-task__button-group " gutter={10}>
          <Flex.Item>
            <Button block variant="outlined" color="primary" onClick={onSubmit}>
              发布任务
            </Button>
          </Flex.Item>
        </Flex>
      </BeFormPublishTask>
    </ChildPageLayout>
  );
}
