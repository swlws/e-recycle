import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'

// 组件
import Banner from '@/components/e-banner'
import CategoryList from './components/category-list'
import ProductList from './components/product-list'

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

      <CategoryList cards={CARD_LIST_DATA} />

      <View className='product-container'>
        <ProductList />
      </View>

    </View>
  )
}
