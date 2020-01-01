import React, { useState, useEffect } from 'react'
import { List, Row, Col, Modal, message, Button, Switch } from 'antd'
import axios from 'axios'
import servicePath from '../../../config/apiURL'
import '../static/css/ArticleList.css'
const { confirm } = Modal

function ArticleList(props) {
  const [list, setList] = useState([]);

  useEffect(() => {
    getList();
  }, [])

  const getList = () => {
    axios({
      method: 'get',
      url: servicePath.getArticleList,
      withCredentials: true
    }).then(res => {
      setList(res.data.list)
    })
  }
  return (
    <div>
      <List
        header = {
          <Row className="list-div">
            <Col span={8}>
              <b>标题</b>
            </Col>
            <Col span={5}>
              <b>类别</b>
            </Col>
            <Col span={5}>
              <b>发布时间</b>
            </Col>
            <Col span={6}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Row className="list-div">
              <Col span={8}>
                {item.title}
              </Col>
              <Col span={5}>
                {item.typeName}
              </Col>
              <Col span={5}>
                {item.addTime}
              </Col>
              <Col span={6}>
                <Button type="primary">修改</Button>&nbsp;
                <Button>删除</Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  )
}

export default ArticleList