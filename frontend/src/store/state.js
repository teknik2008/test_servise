const hosts = []

const scene = []

const requests = []

let responses = []

let sceneResponseTime = [{
  scene_id: 1,
  host_id: 2,
  time: 100
}, {
  scene_id: 2,
  host_id: 2,
  time: 100
}]

let mapResponses = {}
let config = {
  host: 'http://localhost:3000'
}

export default { sceneResponseTime, config, hosts, requests, scene, responses, mapResponses }
