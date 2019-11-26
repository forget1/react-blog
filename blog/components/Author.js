import { Avatar, Divider } from 'antd'
import '../static/style/components/author.css'

const Author = () => {
  return (
    <div className='author-div comm-box'>
      <div><Avatar size={100} src='https://avatars1.githubusercontent.com/u/18653975?s=460&v=4'/></div>
      <div className='author-introduction'>
        美しく最後を飾りつける暇があるなら、 最後まで美しく生きようじゃねーか。
        <Divider>社交账号</Divider>
        <a href='https://github.com/forget1/'><Avatar size={28} icon='github' className='account'/></a>
        <a href="http://wpa.qq.com/msgrd?v=3&uin=2447423830&site=qq&menu=yes"><Avatar size={28} icon='qq' className='account'/></a>
        <Avatar size={28} icon='wechat' className='account'/>
      </div>
    </div>
  )
}

export default Author