import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'

// 组件
import Banner from './components/banner'
import CardList from './components/card-list'

// 变量
import { CARD_LIST_DATA } from './data'

// 样式
import './index.scss'

export default function Index() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='page-bug'>
      <Banner />

      <CardList cards={CARD_LIST_DATA} />
    </View>
  )
}
