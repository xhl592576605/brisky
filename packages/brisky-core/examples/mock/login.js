Mock.mock('examples/api/login', 'post', () => {
  return {
    success: true,
    data: {
      token: 'asdfsd'
    }
  }
})