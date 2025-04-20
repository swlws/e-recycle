import api from '@/api';
import BeFormPublishTask from '@/business/form-publish-task';
import ChildPageLayout from '@/layout/child-page-layout';
import { useLoad, getCurrentInstance } from '@tarojs/taro';
import { useState } from 'react';
import { calculateButtonPermission, IButtonPermission } from './helper';
import { ENUM_PAGE_ALIAS } from '@/constants/route';
import { Button } from '@taroify/core';
import { View } from '@tarojs/components';

export default function TaskDetail() {
  const [loading, setLoading] = useState(true);
  const [taskInfo, setTskInfo] = useState({});
  const [buttonPermission, setButtonPermission] = useState<IButtonPermission>({});

  useLoad(() => {
    loadTaskDetail();
  });

  const loadTaskDetail = () => {
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

        const fromPage = getCurrentInstance().router?.params?.fromPage as ENUM_PAGE_ALIAS;
        setButtonPermission(calculateButtonPermission(fromPage, res));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <ChildPageLayout>
      {!loading && (
        <BeFormPublishTask formValue={taskInfo} readonly={true}>
          <View style={{ margin: '16px' }}>
            {buttonPermission.deleteVisible && (
              <Button variant="outlined" color="danger" block>
                删除
              </Button>
            )}

            {buttonPermission.takeVisible && (
              <Button variant="outlined" color="primary" block>
                抢单
              </Button>
            )}

            {buttonPermission.unTakeVisible && (
              <Button variant="outlined" color="default" block>
                取消
              </Button>
            )}
            {buttonPermission.finishVisible && (
              <Button variant="outlined" color="success" block>
                完成
              </Button>
            )}
          </View>
        </BeFormPublishTask>
      )}
    </ChildPageLayout>
  );
}
