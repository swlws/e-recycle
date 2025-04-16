import { ListResponse } from '@/typings';
import { BackTop, Cell, List, Loading, PullRefresh } from '@taroify/core';
import { usePageScroll, pageScrollTo } from '@tarojs/taro';
import { useRef, useState } from 'react';

interface PullAndLoadMoreListProps<T> {
  loadList?: () => Promise<ListResponse<T>>;
  // 列表项渲染
  itemRender?: (row: T | any, index: number) => React.ReactNode;
}

export default function PullAndLoadMoreList<T>(props: PullAndLoadMoreListProps<T>) {
  const [list, setList] = useState<T[]>([]);
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
      for (let i = 0; i < 20; i++) {
        const text = newList.length + 1;
        // newList.push(text < 10 ? '0' + text : String(text));
        newList.push(('' + text) as T);
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

  const handleBackTop = () => {
    pageScrollTo({
      scrollTop: 0,
      duration: 300,
    });
  };

  const contentRender = () => {
    if (!props.itemRender) {
      return list.map((item, index) => <Cell key={index}>{index}</Cell>);
    }

    return list.map((item, index) => props.itemRender?.(item, index));
  };

  return (
    <PullRefresh loading={refreshingRef.current} reachTop={reachTop} onRefresh={onRefresh}>
      <List loading={loading} hasMore={hasMore} onLoad={onLoad}>
        {/* 内容渲染 */}
        {contentRender()}

        {/* 中间状态 */}
        {!refreshingRef.current && (
          <List.Placeholder>
            {loading && <Loading>加载中...</Loading>}
            {!hasMore && '没有更多了'}
          </List.Placeholder>
        )}
      </List>

      {/* 回到顶部 */}
      <BackTop onClick={handleBackTop}></BackTop>
    </PullRefresh>
  );
}
