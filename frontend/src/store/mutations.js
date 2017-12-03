let addToMapResponses = (state, { item, index }) => {
  let key = `${item.scene_id}_${item.host_id}_${item.request_id}`
  state.mapResponses[key] = index
}

let reMapResponses = (state) => {
  state.mapResponses = {}
  state.responses.map((item, index) => {
    addToMapResponses(state, { item, index })
  })
}

let getServerData = (state, data) => {
  state.hosts.push(...data.hosts)
  state.requests.push(...data.requests)
  state.scene.push(...data.scene)
}

let SOCKET_RESPONSE = (state, data) => {
  let index = state.responses.findIndex(item => item.scene_id === data.scene_id && item.host_id === data.host_id && item.request_id === data.request_id)
  if (index > -1) {
    state.responses.splice(index, 1, data)
  } else {
    state.responses.push(data)
    reMapResponses(state)
  }
}

let SOCKET_TIMESCENE = (state, data) => {
  let index = state.sceneResponseTime.findIndex(item => item.scene_id === data.scene_id && item.host_id === data.host_id)
  if (index > -1) {
    state.sceneResponseTime.splice(index, 1, data)
  } else {
    state.sceneResponseTime.push(data)
  }
}

let clearResponse = state => {
  state.responses.splice(0, state.responses.length)
  state.sceneResponseTime.splice(0, state.sceneResponseTime.length)
}

export default {
  addToMapResponses,
  reMapResponses,
  clearResponse,
  getServerData,
  SOCKET_RESPONSE,
  SOCKET_TIMESCENE
}
