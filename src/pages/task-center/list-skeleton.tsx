import { Skeleton, WhiteSpace } from '@taroify/core';
import { View } from '@tarojs/components';

/**
 * 骨架屏
 * @returns
 */
export default function ListSkeleton() {
  return (
    <View style={{ height: 'calc(100vh - 20px)', overflow: 'hidden' }}>
      {Array(10)
        .fill(0)
        .map(() => {
          return (
            <>
              <Skeleton style={{ width: '40%' }} />
              <WhiteSpace />
              <Skeleton style={{ width: '60%' }} animation={false} />
              <WhiteSpace />
              <Skeleton animation="wave" />
              <WhiteSpace />
            </>
          );
        })}
    </View>
  );
}
