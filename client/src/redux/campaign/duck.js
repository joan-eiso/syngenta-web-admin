const initialState = {
  currentCampaign: new Date().getFullYear(),
}

const reducer = (state = initialState, action) => {
  let type = action.type;
  switch(type) {
    default:
      return state;
  } 
}

export default reducer;