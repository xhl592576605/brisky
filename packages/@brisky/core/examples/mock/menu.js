Mock.mock(/examples\/api\/getMenu/, 'get', () => {
  return {
    success: true,
    data: [{
      id: 11,
      name: '11',
      url: '/111',
      moduleKey: '../examples/component/hello-word/index.js',
      moduleConfig: {
        msg: '11'
      }
    },
    {
      id: 12,
      parentId: 11,
      name: '12',
      url: '/12',
      moduleKey: '../examples/component/hello-word/index.js',
      moduleConfig: {
        msg: '12'
      }
    },
    {
      id: 13,
      parentId: 11,
      name: '13',
      url: '/133',
      moduleKey: '../examples/component/hello-word/index.js',
      moduleConfig: {
        msg: '13'
      }
    },
    {
      id: 21,
      name: '21',
      url: '/21',
      moduleKey: '../examples/component/hello-word/index.js',
      moduleConfig: {
        msg: '21'
      }
    },
    {
      id: 22,
      parentId: 21,
      name: '22',
      url: '/222',
      moduleKey: '../examples/component/hello-word/index.js',
      moduleConfig: {
        msg: '22'
      }
    }]
  }
})
