import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'

// 组件
import CategoryList from './components/category-list'

// 变量
import { CATEGORY_LIST_DATA } from './data'

import './index.scss'

export default function Index() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='page-sell'>
      <CategoryList cards={CATEGORY_LIST_DATA} />

    </View>
  )
}
