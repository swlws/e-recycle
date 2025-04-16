import { Cell, List, Loading, PullRefresh } from '@taroify/core';
import { usePageScroll } from '@tarojs/taro';
import { useRef, useState } from 'react';

interface PullAndLoadMoreListProps {
  // style?: React.CSSProperties;
}

export default function PullAndLoadMoreList(props: PullAndLoadMoreListProps) {
  const [list, setList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [reachTop, setReachTop] = useState(true);
  const refreshingRef = useRef(false);

  usePageScroll(({ scrollTop: aScrollTop }) => {
    setReachTop(aScrollTop === 0);
  });

  const onLoad = () => {
    // 加载中
    setLoading(true);

    // 根据类型，判定是追加还是清空
    const newList = refreshingRef.current ? [] : list;

    setTimeout(() => {
      refreshingRef.current = false;
      for (let i = 0; i < 10; i++) {
        const text = newList.length + 1;
        newList.push(text < 10 ? '0' + text : String(text));
      }
      setList(newList);
      setLoading(false);
      setHasMore(newList.length < 40);
    }, 1000);
  };

  function onRefresh() {
    // 下拉刷新中
    refreshingRef.current = true;

    // 添加loading
    setLoading(false);

    // 加载数据
    onLoad();
  }

  return (
    <PullRefresh loading={refreshingRef.current} reachTop={reachTop} onRefresh={onRefresh}>
      <List loading={loading} hasMore={hasMore} onLoad={onLoad}>
        {list.map((item) => (
          <Cell key={item}>{item}</Cell>
        ))}
        {!refreshingRef.current && (
          <List.Placeholder>
            {loading && <Loading>加载中...</Loading>}
            {!hasMore && '没有更多了'}
          </List.Placeholder>
        )}
      </List>
    </PullRefresh>
  );
}
