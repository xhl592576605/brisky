import { parse, stringify } from 'query-string'


export default function extendUrl(url: string, params: any) {
  const path = url.split('?')[0]
  const search = url.split('?')[1]
  const paramsString = stringify(Object.assign(parse(search), params))

  return paramsString ? `${path}?${paramsString}` : path
}
