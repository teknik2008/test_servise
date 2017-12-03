import axios from 'axios'

let getServerData = (store) => {
  let url = store.state.config.host + '/fixture'
  return axios.get(url).then(result => {
    store.commit('getServerData', result.data)
    console.log('getServerData', result)
  }).catch(e => {
    console.error('getServerData', e)
  })
}

let startTest = (store, params) => {
  let url = store.state.config.host + '/start'
  console.log(url, params)
  return axios.post(url, params).then(result => {
    // store.commit('getServerData', result.data)
    console.log('getServerData', result)
  }).catch(e => {
    console.error('getServerData', e)
  })
}

let test = () => {
  console.log(234)
}

let runTestResponse = (store) => {
  store.commit('reMapResponses')
}

export default { getServerData, test, runTestResponse, startTest }
