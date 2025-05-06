import { Button, Flex, Image, WhiteSpace } from '@taroify/core';
import { ENUM_ROUTE_PATH } from '@/constants/route';
import { gotoPage } from '@/bridge/navigator';
import { View } from '@tarojs/components';
import { ENUM_GOODS_LIST } from '@/constants/public';
import CardButton from './card-button';
import JiuWuHuiShou from '@/asset/images/jiuwuhuishou.png';

import './index.scss';

function publishTask(good?: string) {
  let query = {};
  if (good) {
    query = { good };
  }
  gotoPage(ENUM_ROUTE_PATH.PUBLISH_TASK, query);
}

/**
 * 首页
 * @returns
 */
export default function Mine() {
  return (
    <View className="page-home">
      <View className="page-home__image-wrapper">
        <Image src={JiuWuHuiShou} className="page-home__banner-image"></Image>
      </View>

      <Flex wrap="wrap">
        {ENUM_GOODS_LIST.slice(0, 4).map((item) => {
          return (
            <Flex.Item span={12} key={item.text}>
              <CardButton
                image={item.image}
                text={item.text}
                onClick={() => publishTask(item.text)}
              ></CardButton>
            </Flex.Item>
          );
        })}
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
