import { useState } from 'react';
import ChildPageLayout from '@/layout/child-page-layout';
import BeFormPublishTask from '@/business/form-publish-task';
import { ITaskInfo } from '@/typings/task';
import { Button, Flex } from '@taroify/core';
import api from '@/api';
import CacheMgr from '@/cache';

import './index.scss';

export default function ChildPage() {
  const [formValue, setFormValue] = useState<Partial<ITaskInfo>>(() => {
    const { nickName, phoneNumber } = CacheMgr.user.value;
    return {
      person: nickName,
      phoneNumber,
    };
  });

  const onSubmit = () => {
    api.task.createTask(formValue).then((res) => {
      if (res.r0 !== 0) return;
      console.log('发布成功', res);
    });
  };

  return (
    <ChildPageLayout>
      <BeFormPublishTask formValue={formValue} onChange={setFormValue}>
        <Flex className="publish-task__button-group " gutter={10}>
          <Flex.Item>
            <Button block variant="outlined" color="primary" onClick={onSubmit}>
              提交
            </Button>
          </Flex.Item>
        </Flex>
      </BeFormPublishTask>
    </ChildPageLayout>
  );
}
