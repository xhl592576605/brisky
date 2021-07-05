## brisky
>  brisky框架，致力于整合前端固有的功能点，达到即开即用的前端框架

## 更新计划
	1. 基础工具类
	2. 接口请求机制
	3. 事件总线机制
	4. 基于vue3的框架核心
	5. 基于vue3的框架核心的功能组件
	6. 一键式的cli命令
## 文档地址
[文档地址](https://xhl592576605.github.io/brisky-docs/)
### lerna管理
- `lerna bootstrap`	安装依赖
  - `– --production --no-optional`	指定npm client的参数
  - `–hoist`	把依赖安装到根目录的node_modules
  - `–ignore`	忽略的包 --ignore test-* 忽略名称以test开头的包
  - `–scope`	指定的包 参数的含义是指包的名称
  - `–ignore-scripts`	不执行声明周期脚本命令， 比如 prepare
  - `–registry`	指定registry
  - `–npm-client`	指定安装用的npm client lerna bootstrap --npm-client=yarn
  - `–use-workspace`	使用yarn workspace， 没用过
  - `–no-ci`	默认调用 npm ci 替换 npm install , 使用选项修改设置 npm ci 类似于 npm-install ，但它旨在用于自动化环境，如测试平台，持续集成和部署。
  - `–skip-git`	将不会创建git commit或tag
  - `–skip-npm`	将不会把包publish到npm上
  - `–canary`	可以用来独立发布每个commit，不打tag lerna publish --canary
- `lerna clean`	删除各个包下的node_modules
- `lerna init`	创建新的lerna库
- `lerna list`	显示package列表
  - `–json`	显示为json格式
  - `–all`	显示包含private的包
  - `–long`	显示更多的扩展信息
- `lerna changed`	显示自上次relase tag以来有修改的包， 选项通 list
- `lerna diff`	显示自上次relase tag以来有修改的包的差异， 执行 git diff
- `lerna exec`	在每个包目录下执行任意命令
- `lerna run`	执行每个包package.json中的脚本命令
- `lerna add`	添加一个包的版本为各个包的依赖
- `lerna import`	引入package
- `lerna link`	链接互相引用的库
- `lerna create`	新建package
- `lerna publish`	发布

# yalc 管理各个类库的link
> https://segmentfault.com/a/1190000039658156