module.exports = (antares) => {
    const a = {
        type: 'Persist.toDB'
    }

    antares.subscribeRenderer(({action}) => {
        console.log(`Yay, could render ${action.type}`)        
    })
    antares.process(a)
        .then(s => console.log(`Yay done processing ${a.type} ${s}` + '\n'))
}