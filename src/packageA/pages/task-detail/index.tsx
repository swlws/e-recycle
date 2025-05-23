import api from '@/api';
import BeFormPublishTask from '@/business/form-publish-task';
import ChildPageLayout from '@/layout/child-page-layout';
import { useLoad, getCurrentInstance } from '@tarojs/taro';
import { useMemo, useState } from 'react';
import { calculateButtonPermission, IButtonPermission, patchBusinessEvent } from './helper';
import { ENUM_PAGE_ALIAS } from '@/constants/route';
import { Button, Flex } from '@taroify/core';

import './index.scss';
import { ITaskInfo } from '@/typings/task';
import { View } from '@tarojs/components';
import { TASK_STATE_MAP_ZH_CN } from '@/constants/public';

export default function TaskDetail() {
  const [loading, setLoading] = useState(true);
  const [taskInfo, setTskInfo] = useState<ITaskInfo>({} as ITaskInfo);
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
        console.log('fromPage', fromPage);
        setButtonPermission(calculateButtonPermission(fromPage, res));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const stateZh = useMemo(() => {
    const state = taskInfo.state || '';
    return state ? TASK_STATE_MAP_ZH_CN[state] : '';
  }, [taskInfo]);

  return (
    <ChildPageLayout>
      {!loading && (
        <BeFormPublishTask formValue={taskInfo} readonly={true}>
          <Flex className="task-detail__button-group " gutter={10}>
            {buttonPermission.takeVisible && (
              <Flex.Item>
                <Button
                  variant="outlined"
                  color="primary"
                  block
                  onClick={() => patchBusinessEvent('take', taskInfo)}
                >
                  接单
                </Button>
              </Flex.Item>
            )}

            {buttonPermission.unTakeVisible && (
              <Flex.Item>
                <Button
                  variant="outlined"
                  color="default"
                  block
                  onClick={() => patchBusinessEvent('unTake', taskInfo)}
                >
                  取消接单
                </Button>
              </Flex.Item>
            )}

            {buttonPermission.deleteVisible && (
              <Flex.Item>
                <Button
                  variant="outlined"
                  color="danger"
                  block
                  onClick={() => patchBusinessEvent('delete', taskInfo)}
                >
                  删除
                </Button>
              </Flex.Item>
            )}

            {buttonPermission.finishVisible && (
              <Flex.Item>
                <Button
                  variant="outlined"
                  color="success"
                  block
                  onClick={() => patchBusinessEvent('finish', taskInfo)}
                >
                  确认完成
                </Button>
              </Flex.Item>
            )}
          </Flex>

          <View className={`task-state ${taskInfo.state}`}>{stateZh}</View>
        </BeFormPublishTask>
      )}
    </ChildPageLayout>
  );
}
