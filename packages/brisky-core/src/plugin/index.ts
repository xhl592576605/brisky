import CoreRouterPlugin from "./core-router-plugin"
import CoreSystemPlugin from "./core-system-plugin"
import CoreUserPlugin from "./core-user-plugin"

export default [
  new CoreSystemPlugin(),
  new CoreRouterPlugin(),
  new CoreUserPlugin()
]