const faker = require("faker")

module.exports = antares => {
  antares.subscribeRenderer(({ action }) => {
    console.log(`Rendering ${action.type}`)
  })

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
  actions.forEach(action => {
    antares
      .process(action)
      .then(({ action }) => console.log(`Fully processed: ${action.payload}` + "\n"))
  })
}
