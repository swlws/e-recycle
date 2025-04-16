import { ListResponse } from '@/typings';
import { BackTop, List, Loading, PullRefresh } from '@taroify/core';
import { usePageScroll, pageScrollTo } from '@tarojs/taro';
import { useRef, useState } from 'react';

interface PullAndLoadMoreListProps<T> {
  loadList: (option: { page: number }) => Promise<ListResponse<T>>;
  // 列表项渲染
  itemRender: (row: T, index: number) => React.ReactNode;
}

export default function PullAndLoadMoreList<T>({
  loadList,
  itemRender,
}: PullAndLoadMoreListProps<T>) {
  const [list, setList] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [reachTop, setReachTop] = useState(true);

  const refreshingRef = useRef(false);
  const pageRef = useRef(1);

  usePageScroll(({ scrollTop: aScrollTop }) => {
    setReachTop(aScrollTop === 0);
  });

  const onLoad = () => {
    if (loading) return;
    setLoading(true);

    // 根据类型，判定是追加还是清空
    const newList = refreshingRef.current ? [] : list;

    loadList({ page: pageRef.current })
      .then((res) => {
        newList.push(...res.list);
        setList(newList);

        setHasMore(newList.length < res.total);

        // 下一次加载的页数
        pageRef.current++;
      })
      .finally(() => {
        setLoading(false);

        refreshingRef.current = false;
      });
  };

  function onRefresh() {
    // 下拉刷新中
    refreshingRef.current = true;

    // 重置页数
    pageRef.current = 1;

    // 加载数据
    onLoad();
  }

  return (
    <PullRefresh loading={refreshingRef.current} reachTop={reachTop} onRefresh={onRefresh}>
      <List loading={loading} hasMore={hasMore} onLoad={onLoad}>
        {/* 内容渲染 */}
        {list.map((item, index) => itemRender(item, index))}

        {/* 中间状态 */}
        {!refreshingRef.current && (
          <List.Placeholder>
            {loading && <Loading>加载中...</Loading>}
            {!hasMore && '没有更多了'}
          </List.Placeholder>
        )}
      </List>

      {/* 回到顶部 */}
      <BackTop onClick={() => pageScrollTo({ scrollTop: 0, duration: 300 })}></BackTop>
    </PullRefresh>
  );
}
