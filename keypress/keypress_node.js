const process = require("process")
const readline = require("readline")
readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)

process.stdin.on("keypress", (str, key) => {
  if (str === "x" || key.ctrl && key.name === "c") {
    process.exit()
  } else {
    console.log(`You pressed the "${str}" key`)
    console.log()
    console.log(key)
    console.log()
  }
})

console.log("Push some number keys! (0-9), x to eXit.")
