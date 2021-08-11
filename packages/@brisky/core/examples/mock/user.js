Mock.mock(/examples\/api\/getUser/, 'get', () => {
  return {
    success: true,
    data: {
      userId: '123123',
      userName: 'admin',
      sex: 1
    }
  }
})
