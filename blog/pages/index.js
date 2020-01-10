import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import marked from 'marked'
import hljs from 'highlight.js'

import { Col, Row, List, Icon } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import Axios from 'axios'
import servicePath from '../../config/apiURL'

import 'highlight.js/styles/monokai-sublime.css'

const Home = (res) => {
  const [myList, setMyList] = useState(res.data);

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
        <title>首页</title>
      </Head>
      <Header/>
      <Row className='comm-main' type='flex' justify='center'>
        <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14}>
          <span>
            <List
              header={<div>最新日志</div>}
              itemLayout='vertical'
              dataSource={myList}
              renderItem={item => (
                <List.Item>
                  <div className='list-title'>
                    <Link href={{pathname: '/detailed', query: {id: item.id}}}>
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <span className='list-icon'>
                    <span><Icon type='calendar'/>{item.addTime}</span>
                    <span><Icon type='folder'/>{item.typeName}</span>
                    <span><Icon type='fire'/>{item.view_count}人</span>
                  </span>
                  <div className='list-context' dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}></div>
                </List.Item>
              )}
            />
          </span>
        </Col>
        <Col xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author/>
        </Col>
      </Row>
      <Footer/>
    </>
  )
}

Home.getInitialProps = async() => {
  const promise = new Promise((resolve) => {
    Axios(servicePath.getBlogArticleList).then(
      (res) => {
        resolve(res.data)
      }
    )
  })
  return await promise;
}

export default Home