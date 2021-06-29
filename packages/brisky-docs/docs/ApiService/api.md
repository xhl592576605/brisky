# api配置说明
配置以一个对象存储，便于分组，请求时，传递key来指定某个请求，key值的规范便是对象字段的组成，如`system.login`

``` json
{
  "system": {
     "login": {
        "remark": "接口备注",
        "author": "接口作者",
        "method": "请求方式get|post",
        "url": "接口路径",
        "baseURL":"若是第三方请求，url是完整的，baseURL可以设置为''",
        "params": "url参数，是一个对象",
        "data":"body参数，可以是一个对象，也可以是数组",
        "certificate":"certificate为true才会头部带入token"
         }
  }
}
```