import CoreAuthPlugin from "./core-auth-plugin"
import CoreMenuPlugin from "./core-menu-plugin"
import CoreOrtherPlugin from "./core-orther-plugin"
import CoreRouterPlugin from "./core-router-plugin"
import CoreSystemPlugin from "./core-system-plugin"
import CoreTokenPlugin from "./core-token-plugin"
import CoreUserPlugin from "./core-user-plugin"
import CoreXhrProxyPlugin from "./core-xhr-proxy-plugin"
import CoreXhrRewritePlugin from "./core-xhr-rewrite-plugin"

export default [
  new CoreSystemPlugin(),
  new CoreRouterPlugin(),
  new CoreUserPlugin(),
  new CoreMenuPlugin(),
  new CoreTokenPlugin(),
  new CoreAuthPlugin(),
  new CoreOrtherPlugin(),
  new CoreXhrProxyPlugin(),
  new CoreXhrRewritePlugin()
]