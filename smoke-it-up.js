let loadedOnce;

module.exports = antares => {
  if (!loadedOnce) {
    antares.subscribeRenderer(({ action }) => {
      console.log(`Yay, could render ${action.type}`);
    });

    loadedOnce = true;
  }

  const action = {
    type: 'Some.type'
  };
  antares
    .process(action)
    .then(({ action }) => console.log(`Yay done processing ${action.type}` + '\n'));
};
