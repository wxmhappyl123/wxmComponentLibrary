 var env = process.env.NODE_ENV //获取环境
  var configObj = {
    //开发/本地环境
    dev: {
      // mjBaseUrl: 'http://imccp-cloud-gateway.imccp:3001', //魔镜本地开发环境默认走本地代理地址，才不会跨域问题
      // mjBaseUrl: 'https://mojing.sctel.com.cn', //魔镜本地开发环境默认走本地代理地址，才不会跨域问题
      // mjBaseUrl: 'api', //魔镜本地开发环境默认走本地代理地址，才不会跨域问题
      // hallBaseUrl: 'http://10.42.233.241:23000',//智慧营业厅请求地址
      // singleBaseUrl: 'http://10.42.248.2:23002', //单页面的部分接口请求地址
      // token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxMzk4MDkxNTQ2MSIsInB0X2lkIjoiMDB6aHl5dDAwMDIwMCIsInNjb3BlIjpbIndyaXRlIl0sImlkIjoiMTI0Nzc4MjU5ODkyOTczMTU4NiIsImV4cCI6MjUxNjc2MTQ0MiwidXNlcklkIjoiMTI0Nzc4MjU5ODQ0NzM4NjYyNSIsImF1dGhvcml0aWVzIjpbXSwianRpIjoiMTEwMzdmOWEtZjkwMC00ODkxLWI4YzMtOWIyMDJlOGE4ODE2IiwiY2xpZW50X2lkIjoiY2xpZW50MSJ9.-ymmT7NKmDuo61rovSga55f6PvFUr-2puclP5gKo3-c'
      mjBaseUrl: 'http://gateway.mj.cn',
      hallBaseUrl: 'http://zhihuiauth.mj.cn',
      singleBaseUrl: 'http://zhihuiweb.mj.cn',
      token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxMzk4MDkxNTQ2MSIsInB0X2lkIjoiMDB6aGlodWkwMCIsInNjb3BlIjpbIndyaXRlIl0sImlkIjoiMTI4MjU3MjkwMzc5ODA4MzU4NiIsImV4cCI6MTU5NzgzMTYxMywidXNlcklkIjoiMTI4MjU3MjkwMzM3NDQ1ODg4MiIsImF1dGhvcml0aWVzIjpbXSwianRpIjoiYTRkN2NiYjYtMzI3MC00NzM3LWI4NTAtMWU5MzliMDIyNDMwIiwiY2xpZW50X2lkIjoibWptaCJ9.q-dgiNIUrcRERNirw7ywqNwUtuqNo4BQK0lfOsPtT7A'
    },
    //测试环境
    test: {
      mjBaseUrl: 'http://gateway.mj.cn',
      hallBaseUrl: 'http://zhihuiauth.mj.cn',
      singleBaseUrl: 'http://zhihuiweb.mj.cn',
      token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxMzk4MDkxNTQ2MSIsInB0X2lkIjoiMDB6aGlodWkwMCIsInNjb3BlIjpbIndyaXRlIl0sImlkIjoiMTI4MjU3MjkwMzc5ODA4MzU4NiIsImV4cCI6MTU5NzgzMTYxMywidXNlcklkIjoiMTI4MjU3MjkwMzM3NDQ1ODg4MiIsImF1dGhvcml0aWVzIjpbXSwianRpIjoiYTRkN2NiYjYtMzI3MC00NzM3LWI4NTAtMWU5MzliMDIyNDMwIiwiY2xpZW50X2lkIjoibWptaCJ9.q-dgiNIUrcRERNirw7ywqNwUtuqNo4BQK0lfOsPtT7A'
    },
    //生产环境
    prod: {
      mjBaseUrl: 'https://mojing.sctel.com.cn',
      hallBaseUrl: '',
      singleBaseUrl: '',
      token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxMzk4MDkxNTQ2MSIsInB0X2lkIjoiMDB6aHl5dDAwMDIwMCIsInNjb3BlIjpbIndyaXRlIl0sImlkIjoiMTI0Nzc4MjU5ODkyOTczMTU4NiIsImV4cCI6MjUxNjc2MTQ0MiwidXNlcklkIjoiMTI0Nzc4MjU5ODQ0NzM4NjYyNSIsImF1dGhvcml0aWVzIjpbXSwianRpIjoiMTEwMzdmOWEtZjkwMC00ODkxLWI4YzMtOWIyMDJlOGE4ODE2IiwiY2xpZW50X2lkIjoiY2xpZW50MSJ9.-ymmT7NKmDuo61rovSga55f6PvFUr-2puclP5gKo3-c'
    },
    //演示环境
    demo: {
      mjBaseUrl: '',
      hallBaseUrl: '',
      singleBaseUrl: ''
    },
    //预发布环境
    preProd: {
      mjBaseUrl: '',
      hallBaseUrl: '',
      singleBaseUrl: ''
    },
  }
  var configEnv
  if (env) configEnv = configObj[env]
  else configEnv = configObj['dev']
export {configEnv}
