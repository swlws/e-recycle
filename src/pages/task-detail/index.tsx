import api from '@/api';
import BeFormPublishTask from '@/business/form-publish-task';
import ChildPageLayout from '@/layout/child-page-layout';
import { useLoad, getCurrentInstance } from '@tarojs/taro';
import { useState } from 'react';

export default function TaskDetail() {
  const [loading, setLoading] = useState(true);
  const [taskInfo, setTskInfo] = useState({});

  useLoad(() => {
    const _id = getCurrentInstance().router?.params?._id;
    if (!_id) {
      setLoading(false);
      return;
    }

    api.task
      .queryOneTask({ _id })
      .then(({ r0, res }) => {
        if (r0 !== 0) return;
        setTskInfo(res);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  return (
    <ChildPageLayout>
      {!loading && <BeFormPublishTask formValue={taskInfo} readonly={true}></BeFormPublishTask>}
    </ChildPageLayout>
  );
}
