import { Button, Flex, WhiteSpace } from '@taroify/core';
import { ENUM_ROUTE_PATH } from '@/constants/route';
import { gotoPage } from '@/bridge/navigator';
import { View } from '@tarojs/components';

import ChaiQian from '@/asset/images/chaiqian.png';
import JinShu from '@/asset/images/jinshu.png';
import TuShu from '@/asset/images/tushu.png';
import YiWu from '@/asset/images/yiwu.png';
import CardButton from './card-button';

import './index.scss';

function publishTask(good?: string) {
  gotoPage(ENUM_ROUTE_PATH.PUBLISH_TASK, { good });
}

/**
 * 首页
 * @returns
 */
export default function Mine() {
  return (
    <View className="page-home">
      <View className="page-home__header">E速收 搞点钱</View>

      <WhiteSpace size="large" />

      <Flex gutter={16}>
        <Flex.Item span={12}>
          <CardButton
            image={ChaiQian}
            text="建筑拆迁"
            onClick={() => publishTask('建筑拆迁')}
          ></CardButton>
        </Flex.Item>
        <Flex.Item span={12}>
          <CardButton
            image={JinShu}
            text="废旧金属"
            onClick={() => publishTask('废旧金属')}
          ></CardButton>
        </Flex.Item>
      </Flex>

      <Flex gutter={16}>
        <Flex.Item span={12}>
          <CardButton
            image={TuShu}
            text="纸质图书"
            onClick={() => publishTask('纸质图书')}
          ></CardButton>
        </Flex.Item>
        <Flex.Item span={12}>
          <CardButton
            image={YiWu}
            text="废旧衣物"
            onClick={() => publishTask('废旧衣物')}
          ></CardButton>
        </Flex.Item>
      </Flex>

      <WhiteSpace size="large" />

      <Button
        className="page-home__publish-button"
        color="primary"
        block
        onClick={() => publishTask()}
      >
        一键出售
      </Button>
    </View>
  );
}
