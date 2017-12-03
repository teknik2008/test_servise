let requests = state => (scene) => {
  return state.requests.filter(item => {
    return item.scene_id === scene
  })
}

let responseIndex = state => key => {
  let index = state.mapResponses[key]
  return state.responses[index]
}

let sceneResponseTime = state => ({ scene_id, host_id }) => {
  return state.sceneResponseTime.find(item => item.scene_id === scene_id && item.host_id === host_id) || {}
}

export default { requests, responseIndex, sceneResponseTime }
