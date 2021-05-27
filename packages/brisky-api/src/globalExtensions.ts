declare global {
  interface Window {
    require: (key: Array<string>, func: any) => {}
  }
}

export { }