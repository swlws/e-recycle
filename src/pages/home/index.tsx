import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'
// 若项目配置了别名 @ 指向 src 目录，确保路径正确
// import NForm from '@/components/form/index';
// 若未配置别名，使用相对路径
import NForm from '../../components/n-form/index';

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
