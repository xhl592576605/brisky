import CoreMenuPlugin from "./core-menu-plugin"
import CoreRouterPlugin from "./core-router-plugin"
import CoreSystemPlugin from "./core-system-plugin"
import CoreTokenPlugin from "./core-token-plugin"
import CoreUserPlugin from "./core-user-plugin"

export default [
  new CoreSystemPlugin(),
  new CoreRouterPlugin(),
  new CoreUserPlugin(),
  new CoreMenuPlugin(),
  new CoreTokenPlugin()
]