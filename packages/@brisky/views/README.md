## 开发说明
### view.conf.ts
  入口文件，映射webpack多入口机制，定义为主入口，页面入口，主入口不可删，若是本地开发，可增加自行增加一个view.local.conf.ts

### 组件（业务）开发
  采用tsx开发，一个组件，一个文件夹，其中`index.tsx`，每增一个，若是需要导出，便需要增加入口文件


### 若是需要看效果
  可以在`public/config/boot.index.conf.js`增加一个路由，并设置`authorized`,可以参考'/'

## 现阶段开发任务
2021年8月15日：
  1. login，exception404，exception501组件开发--贤
    1. 需要设计一套样式基准

  2. mock机制，增加数据模拟机制，以便更好的调试--乐
