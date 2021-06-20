export default function log(msg: any, obj: any) {
  if (window.$frame.debug || location.href.includes('debug')) {
    const iconList = ['🦑', '🦐', '🦀', '🦞', '🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶', '🌽', '🥕', '🥔', '🥐', '🍠', '🥯', '🍞', '🥖', '🥨', '🧀', '🥚', '🥞', '🥓', '🥩', '🍗', '🍖', '🦴', '🌭', '🍔', '🍟', '🍕', '🥪', '🌮', '🌯', '🥘', '🥗', '🍝', '🥫', '🥘', '🍜', '🍲', '🍝', '🍛', '🍣', '🍱', '🥟', '🍤', '🍚', '🍥', '🥠', '🥮', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍿', '🍩', '🍪', '🌰', '🥜', '🍯', '🥛', '🍼️', '🍵', '🥤', '🍶', '🍺', '🍻', '🍷', '🥃', '🍸', '🍹', '🍾', '🥡', '🧂']
    //const colorList = ["#42b983", "#33A5FF", "#B03734", "#2EAFB0", "#6EC1C2", "#ED9EC7", "#FCA650", "#3F7CFF", "#93C0A4", "#EA7E5C", "#F5CE50", "#465975", "#FFDD4D", "#7F2B82", "#4b4b4b", "#E41A6A"]
    const imageList = ["https://user-gold-cdn.xitu.io/2019/5/26/16af31033bf16191?w=750&h=190&f=png&s=93956", "https://user-gold-cdn.xitu.io/2019/5/26/16af3100420b67a8?w=784&h=198&f=png&s=103447", "https://user-gold-cdn.xitu.io/2019/5/26/16af3105318f35d3?w=754&h=190&f=png&s=101303", "https://user-gold-cdn.xitu.io/2019/5/26/16af3106284daa01?w=736&h=186&f=png&s=91845"]
    const iconIndex = Math.floor(Math.random() * iconList.length)
    //const colorIndex = Math.floor(Math.random() * colorList.length)
    const imageIndex = Math.floor(Math.random() * imageList.length)
    const style = `font-size:10px;background-image: url(${imageList[imageIndex]});background-size: 100% 100%;color: #465975;`
    if (arguments.length === 1 && typeof arguments[0] != "object") {
      const msg = `%c ${iconList[iconIndex]} ${arguments[0]}  `
      console.log(`[brisky]${msg}`, style)
    } else if (arguments.length === 2 && typeof arguments[0] === "string" && typeof arguments[1] === "object") {
      const msg = `%c ${iconList[iconIndex]} ${arguments[0]} `
      console.log(msg, style, arguments[1])
    } else if (arguments.length === 2 && typeof arguments[0] === "string" && typeof arguments[1] != "object") {
      const msg = `%c ${iconList[iconIndex]} ${arguments[0]} ${arguments[1]}  `
      console.log(`[brisky]${msg}`, style)
    } else {
      const msg = `%c ${iconList[iconIndex]} data: `
      console.log(`[brisky]${msg}`, style, ...arguments)
    }
  }
}
