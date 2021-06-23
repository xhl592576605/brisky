Mock.mock(/examples\/api\/getMenu/, 'post', () => {
  return {
    success: true,
    data: []
  }
})
