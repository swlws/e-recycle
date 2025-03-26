import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'
import NForm from '@/components/n-form/index.jsx';

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='index'>
      <Text>Home</Text>
      <NForm onSubmit={() =>{}}>
        {/* 表单内容 */}
      </NForm>
    </View>

  )
}
