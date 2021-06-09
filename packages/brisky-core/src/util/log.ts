export default function log(msg: any, obj: any) {
  if (process.env.NODE_ENV !== 'production' || location.href.includes('debug')) {
    console.warn(`【brisky】${msg}`)
    obj !== undefined && console.log(obj)
  }
}
