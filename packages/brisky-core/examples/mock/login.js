Mock.mock(/examples\/api\/login/, 'post', () => {
  return {
    success: true,
    data: {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3ByaW1hcnlzaWQiOiI5Mzc3OTg4Nzg4NjIxMzE3IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9zZXJpYWxudW1iZXIiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6Iui2hee6p-euoeeQhuWRmCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6Ilt7XCJJZFwiOjkzNzc5ODg4MTE5NTIxMzMsXCJSb2xlTmFtZVwiOlwi6LaF57qn566h55CG5ZGY6KeS6ImyXCIsXCJJc1N0YXRpY1wiOnRydWUsXCJSZW1hcmtcIjpcIui2hee6p-euoeeQhuWRmOinkuiJslwifV0iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA5LzA5L2lkZW50aXR5L2NsYWltcy9hY3RvciI6Ilt7XCJQZXJtaXNzaW9uSWRcIjoxLFwiTmFtZVwiOlwi6LaF57qn5p2D6ZmQXCIsXCJDb2RlXCI6XCJTdXBwZXJQZXJtaXNzaW9uXCJ9LHtcIlBlcm1pc3Npb25JZFwiOjIsXCJOYW1lXCI6XCLotKbmiLfmqKHlnZctMVwiLFwiQ29kZVwiOlwiQWNjb3VudFwifSx7XCJQZXJtaXNzaW9uSWRcIjozLFwiTmFtZVwiOlwi5L-u5pS55a-G56CBXCIsXCJDb2RlXCI6XCJBY2NvdW50LlVwZGF0ZVBhc3NXb3JkXCJ9LHtcIlBlcm1pc3Npb25JZFwiOjQsXCJOYW1lXCI6XCLoj5zljZXmqKHlnZdcIixcIkNvZGVcIjpcIk5hdmlnYXRlXCJ9LHtcIlBlcm1pc3Npb25JZFwiOjUsXCJOYW1lXCI6XCLliJvlu7roj5zljZVcIixcIkNvZGVcIjpcIk5hdmlnYXRlLkNyZWF0ZU5hdmlnYXRlXCJ9LHtcIlBlcm1pc3Npb25JZFwiOjYsXCJOYW1lXCI6XCLmm7TmlrDoj5zljZVcIixcIkNvZGVcIjpcIk5hdmlnYXRlLlVwZGF0ZU5hdmlnYXRlXCJ9LHtcIlBlcm1pc3Npb25JZFwiOjcsXCJOYW1lXCI6XCLliKDpmaToj5zljZVcIixcIkNvZGVcIjpcIk5hdmlnYXRlLkRlbGV0ZU5hdmlnYXRlXCJ9LHtcIlBlcm1pc3Npb25JZFwiOjgsXCJOYW1lXCI6XCLojrflj5boj5zljZXmoJFcIixcIkNvZGVcIjpcIk5hdmlnYXRlLkdldEFsbE5hdmlnYXRlQnlUcmVlXCJ9LHtcIlBlcm1pc3Npb25JZFwiOjksXCJOYW1lXCI6XCLmnYPpmZDmqKHlnZdcIixcIkNvZGVcIjpcIlBlcm1pc3Npb25cIn0se1wiUGVybWlzc2lvbklkXCI6MTAsXCJOYW1lXCI6XCLliJvlu7rmnYPpmZBcIixcIkNvZGVcIjpcIlBlcm1pc3Npb24uQ3JlYXRlUGVybWlzc2lvblwifSx7XCJQZXJtaXNzaW9uSWRcIjoxMSxcIk5hbWVcIjpcIuabtOaWsOadg-mZkFwiLFwiQ29kZVwiOlwiUGVybWlzc2lvbi5VcGRhdGVQZXJtaXNzaW9uXCJ9LHtcIlBlcm1pc3Npb25JZFwiOjEyLFwiTmFtZVwiOlwi5Yig6Zmk5p2D6ZmQXCIsXCJDb2RlXCI6XCJQZXJtaXNzaW9uLkRlbGV0ZVBlcm1pc3Npb25cIn0se1wiUGVybWlzc2lvbklkXCI6MTMsXCJOYW1lXCI6XCLnu5nop5LoibLmjojmnYNcIixcIkNvZGVcIjpcIlBlcm1pc3Npb24uR3JhbnRQZXJtaXNzaW9uXCJ9LHtcIlBlcm1pc3Npb25JZFwiOjE0LFwiTmFtZVwiOlwi57uZ6KeS6Imy5Y-W5raI5o6I5p2DXCIsXCJDb2RlXCI6XCJQZXJtaXNzaW9uLkNhbmNlbEdyYW50UGVybWlzc2lvblwifSx7XCJQZXJtaXNzaW9uSWRcIjoxNSxcIk5hbWVcIjpcIuiOt-WPluadg-mZkOagkVwiLFwiQ29kZVwiOlwiUGVybWlzc2lvbi5HZXRBbGxQZXJtaXNzaW9uQnlUcmVlXCJ9LHtcIlBlcm1pc3Npb25JZFwiOjE2LFwiTmFtZVwiOlwi6KeS6Imy5qih5Z2XXCIsXCJDb2RlXCI6XCJSb2xlXCJ9LHtcIlBlcm1pc3Npb25JZFwiOjE3LFwiTmFtZVwiOlwi5Yib5bu66KeS6ImyXCIsXCJDb2RlXCI6XCJSb2xlLkNyZWF0ZVJvbGVcIn0se1wiUGVybWlzc2lvbklkXCI6MTgsXCJOYW1lXCI6XCLmm7TmlrDop5LoibJcIixcIkNvZGVcIjpcIlJvbGUuVXBkYXRlUm9sZVwifSx7XCJQZXJtaXNzaW9uSWRcIjoxOSxcIk5hbWVcIjpcIuWIoOmZpOinkuiJslwiLFwiQ29kZVwiOlwiUm9sZS5EZWxldGVSb2xlXCJ9LHtcIlBlcm1pc3Npb25JZFwiOjIwLFwiTmFtZVwiOlwi55So5oi35o6I5LqI6KeS6ImyXCIsXCJDb2RlXCI6XCJSb2xlLkdyYW50VXNlclJvbGVNYXBcIn0se1wiUGVybWlzc2lvbklkXCI6MjEsXCJOYW1lXCI6XCLlj5bmtojnlKjmiLfmjojkuojop5LoibJcIixcIkNvZGVcIjpcIlJvbGUuQ2FuY2VsR3JhbnRVc2VyUm9sZU1hcFwifSx7XCJQZXJtaXNzaW9uSWRcIjoyMixcIk5hbWVcIjpcIuiOt-WPluinkuiJsuagkVwiLFwiQ29kZVwiOlwiUm9sZS5HZXRBbGxSb2xlQnlUcmVlXCJ9XSIsImp0aSI6IjkzNzc5ODg3ODg2MjEzMTciLCJpYXQiOiIyMDIxLzYvMjMg5LiL5Y2IMTE6MDM6MjkiLCJuYmYiOjE2MjQ0NjA2MDksImV4cCI6MTYyNDU0NzAwOSwiaXNzIjoiSENTRC5XZWIiLCJhdWQiOiJIQ1NELkF1ZGllbmNlIn0.WHZhriUwpgcUS-1TrZDQ0mPXKOUwQ7aR_bve8BKYXQo'
    }
  }
})
