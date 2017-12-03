"use strict";

const axios = require("axios");
const fixture = require("../fixture");
const Emitter = require('events')


class TestServise {
  constructor(hosts, scheme, requests) {
    this.hosts = hosts;
    this.scheme = scheme;
    this.requests = requests;
    this.emitter = new Emitter()
    this.init();
  }

  compareNumber(...args) {
    return args.find((value) => typeof value === "number");
  }

  /**
   * Промис задержки выполнения
   * @param delay - время задержки в мс
   */
  slipDelay(delay) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  async connect(...axiosParams) {
    let start = Date.now()
    return new Promise(resolve => {
      function axiosFinally(data) {
        data.timeRequest = Date.now() - start;
        resolve(data)
      }
      axios(...axiosParams).then(axiosFinally).catch(axiosFinally)
    })
  }


  async runScene(host, request, scene) {
    let { url = "", headers: rootHeaders = [] } = host;
    let {headersStep } = scene
    url += request.path;
    const headers = Object.assign({}, request.headers, headersStep, rootHeaders);
    const { method, data, params, parallel = 1, count = 1, delay = 0 } = request;
    const _this = this;
    for (let c = 0; c < count; c++) {
      if (delay && c) await this.slipDelay(delay);
      const stepItems = [];
      for (let p = 0; p < parallel; p++) {
        const connect = this.connect({
          method,
          url,
          validateStatus: (status) => {
            return true
          },
          params,
          headers,
          data,
        });
        stepItems.push(connect);
      }
      try {
        const responses = await Promise.all(stepItems);
        responses.map((response) => {
        
          this.emitter.emit('response',{
            host_id:host.host_id,
            request_id:request.request_id,
            scene_id:scene.scene_id,
            time:response.timeRequest,
            status:response.status,
            length:response.headers['content-length'],
          })
          // console.log(url, '\t', response.status, '\t', response.timeRequest, '\t', response.headers['content-length'], );
        });
      } catch (e) {
        console.log(e)
      }
    }
  }

  async runStep(scene, host) {
    const { parallel = 1, delay = 0, count = 1, name } = scene;
    let requests = this.requests.reduce((akk,item)=>{
      if(item.scene_id==scene.scene_id)akk.push(item)
      return akk
    },[])
    for (let c = 0; c < count; c++) {
      if (delay > 0 && c) {
        await this.slipDelay(delay);
      }
      const sceneItems = [];
      for (let p = 0; p < parallel; p++) {
        for (const i in requests) {
          const request = requests[i];
          let resultScene =  this.runScene(host, request, scene)
          sceneItems.push(resultScene);
        }
      }
      let start = Date.now()
      await Promise.all(sceneItems);
      this.emitter.emit('timescene',{
        scene_id:scene.scene_id,
        host_id:host.host_id,
        time:Date.now() - start
      })
    }
  }

  async init() {
    const hosts = this.hosts;
    for (const step of this.scheme) {
      for (const i in hosts) {
        const host = hosts[i];
        await this.runStep(step, host);
      }
    }
  }
}
module.exports = TestServise;

