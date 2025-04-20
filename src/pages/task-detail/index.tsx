import api from '@/api';
import BeFormPublishTask from '@/business/form-publish-task';
import ChildPageLayout from '@/layout/child-page-layout';
import { useLoad, getCurrentInstance } from '@tarojs/taro';
import { useState } from 'react';
import { calculateButtonPermission, IButtonPermission } from './helper';
import { ENUM_PAGE_ALIAS } from '@/constants/route';
import { Button, Flex } from '@taroify/core';

import './index.scss';

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
          <Flex className="task-detail__button-group " gutter={10}>
            {buttonPermission.takeVisible && (
              <Flex.Item>
                <Button variant="outlined" color="primary" block>
                  抢单
                </Button>
              </Flex.Item>
            )}

            {buttonPermission.unTakeVisible && (
              <Flex.Item>
                <Button variant="outlined" color="default" block>
                  放弃
                </Button>
              </Flex.Item>
            )}

            {buttonPermission.deleteVisible && (
              <Flex.Item>
                <Button variant="outlined" color="danger" block>
                  删除
                </Button>
              </Flex.Item>
            )}

            {buttonPermission.finishVisible && (
              <Flex.Item>
                <Button variant="outlined" color="success" block>
                  完成
                </Button>
              </Flex.Item>
            )}
          </Flex>
        </BeFormPublishTask>
      )}
    </ChildPageLayout>
  );
}
