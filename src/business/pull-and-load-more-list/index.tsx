import { ListResponse } from '@/typings';
import { BackTop, Empty, List, Loading, PullRefresh } from '@taroify/core';
import { usePageScroll, pageScrollTo } from '@tarojs/taro';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

import './index.scss';

interface PullAndLoadMoreListProps<T> {
  loadList: (option: { page: number }) => Promise<ListResponse<T>>;
  // 列表项渲染
  itemRender: (row: T, index: number) => React.ReactNode;
}

function PullAndLoadMoreList<T>({ loadList, itemRender }: PullAndLoadMoreListProps<T>, ref: any) {
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
    // const newList = refreshingRef.current ? [] : list;

    loadList({ page: pageRef.current })
      .then((res) => {
        setList((oldList) => {
          const newList = refreshingRef.current ? [] : oldList;
          newList.push(...res.list);

          setHasMore(newList.length < res.total);

          return newList;
        });

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

  useImperativeHandle(ref, () => ({
    refresh: onRefresh,
  }));

  return (
    <PullRefresh
      className="n-pull-refresh"
      loading={refreshingRef.current}
      reachTop={reachTop}
      onRefresh={onRefresh}
    >
      <List className="n-list" fixedHeight loading={loading} hasMore={hasMore} onLoad={onLoad}>
        {/* 内容渲染 */}
        {list.map((item, index) => itemRender(item, index))}

        {/* 中间状态 */}
        {!refreshingRef.current && (
          <List.Placeholder>
            {loading && <Loading>加载中...</Loading>}
            {list.length && !hasMore ? '没有更多了' : ''}
            {!list.length && !loading ? (
              <Empty>
                <Empty.Image />
              </Empty>
            ) : (
              ''
            )}
          </List.Placeholder>
        )}
      </List>

      {/* 回到顶部 */}
      <BackTop onClick={() => pageScrollTo({ scrollTop: 0, duration: 300 })}></BackTop>
    </PullRefresh>
  );
}

export default forwardRef(PullAndLoadMoreList);
