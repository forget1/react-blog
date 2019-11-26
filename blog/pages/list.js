import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'
import servicePath from '../../config/apiURL'

import { Col, Row, List, Icon, Breadcrumb } from 'antd'
import 'highlight.js/styles/monokai-sublime.css'
import '../static/style/pages/list.css'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'

const blogList = (res) => {

  const [ myList, setMyList ] = useState(res.data);

  useEffect(()=> {
    setMyList(res.data);
  });

  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: false,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  });

  return (
    <>
      <Head>
        <title>blogList</title>
      </Head>
      <Header />
      <Row className='comm-main' type='flex' justify='center'>
        <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className='bread-div'>
              <Breadcrumb>
                <Breadcrumb.Item><a href='/'>首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>视频列表</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <List
              header={<div>最新日志</div>}
              itemLayout='vertical'
              dataSource={myList}
              renderItem={item => (
                <List.Item>
                  <div className='list-title'>
                    <Link href={{pathname: '/detailed', query: {id:item.id}}}>
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className='list-icon'>
                    <span><Icon type='calendar'/>{item.addTime}</span>
                    <span><Icon type='folder'/>{item.typeName}</span>
                    <span><Icon type='fire'/>{item.view_count}人</span>
                  </div>
                  <div className='list-context' dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}></div>
                </List.Item>
              )}
            />
          </div>
        </Col>
        <Col xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author/>
        </Col>
      </Row>
      <Footer/>
    </>
  )
}

blogList.getInitialProps = async (context) => {
  const id = context.query.id;
  const promise = new Promise((resolve) => {
    axios.get(servicePath.getListById + id).then(
      (res) => {
        resolve(res.data);
      }
    )
  })
  return await promise;
}

export default blogList