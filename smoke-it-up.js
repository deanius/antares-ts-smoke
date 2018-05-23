const faker = require("faker")
const say = require("say")

module.exports = antares => {
  antares.subscribeRenderer(({ action }) => {
    console.log(`Rendering ${action.type}`)
  })

  //  Variable to let us only start speaking once the current one is done - see below!
  let currentSpeakingIsOver = Promise.resolve()

  antares.subscribeRenderer(
    ({ action }) => {
      // naive implementation - multiple speakings may go on at once
      console.log(`Speaking ${action.payload} ..`)
      say.speak(action.payload, "Good News", 1.0)

      // full implementation - you promise-chain the current speech
      // upon the promise that the current speaking is over
      // note that keeping a queue of renderings is exactly what an epic would be for!
      // Every sufficiently complex async program contains a bug-riddeen partially impl. RxJS!
      // let getNextSaying = text => () => {
      //   return new Promise(resolve => {
      //     console.log(`Speaking ${text} ..`)
      //     say.speak(text, "Good News", 1.0, resolve)
      //   })
      // }

      // currentSpeakingIsOver = currentSpeakingIsOver.then(
      //   getNextSaying(action.payload)
      // )
    },
    { mode: "sync" }
  )

  const actions = [
    {
      type: "Biz.speak",
      payload: faker.company.catchPhrase()
    },
    {
      type: "Biz.speak",
      payload: faker.company.catchPhrase()
    }
  ]

  // you wouldn't normally wait for each promise..
  actions.reduce((lastActionPromise, action) => {
    return lastActionPromise.then(() => {
      return antares
        .process(action)
        .then(({ action }) =>
          console.log(`Fully processed: ${action.payload}` + "\n")
        )
    })
  }, Promise.resolve())
  .then(() => console.log('Done!'))
}
