import axios from "axios";
import * as fixture from "./fixture/index";

// let q = fixture.steps[0].scene

// class Reqest{
//     constructor(){
//         this.url
//     }
// }

class TestServise {
  // tslint:disable-next-line:member-access
  geeting: string;
  // tslint:disable-next-line:member-access
  hosts: host[];
  // tslint:disable-next-line:member-access
  scheme: scheme;
  constructor(hosts: host[], scheme: scheme) {
    this.hosts = hosts;
    this.scheme = scheme;
  }

  private compareNumber(...args: number[]): number {
    return args.find((value) => typeof value === "number");
  }

  /**
   * Промис задержки выполнения
   * @param delay - время задержки в мс
   */
  private slipDelay(delay: number) {
    return new Promise((resolve): void => {
      setTimeout(resolve, delay);
    });
  }

  private async runScene(host: host, scene: scene, headersStep?: header) {
    // tslint:disable-next-line:prefer-const
    let { url = "", headers: rootHeaders = [] } = host;
    url += scene.url;
    const headers = Object.assign({}, scene.headers, headersStep, rootHeaders);
    const { method, data, params, parallel = 1, count = 1, delay = 0 } = scene;
    for (let c = 0; c < count; c++) {
      if (delay > 0) { await (delay); }
      const stepItems = [];
      for (let p = 0; p < parallel; p++) {
        // stepItems
        const request = axios({
          method,
          url,
          // tslint:disable-next-line:object-literal-sort-keys
          params,
          headers,
          data,
        });
        stepItems.push(request);
      }
      const responses = await Promise.all(stepItems);
      // tslint:disable-next-line:no-console
      console.log(responses);
    }
  }

  private async runStep(step: step, host: host) {
    const { parallel = 1, delay = 0, count = 1, name, scene } = step;
    for (let c = 0; c < count; c++) {
      if (delay > 0) { await (delay); }
      const sceneItems = [];
      for (let p = 0; p < parallel; p++) {
        // tslint:disable-next-line:forin
        for (const i in step.scene) {
          // tslint:disable-next-line:no-shadowed-variable
          const scene = step.scene[i];
          sceneItems.push(this.runScene(host, scene, step.headers));
        }
      }
    }
  }

  // tslint:disable-next-line:member-ordering
  public async init() {
    const hosts = this.hosts;
    for (const step of this.scheme.steps) {
      // tslint:disable-next-line:forin
      for (const i in hosts) {
        const host: host = hosts[i];
        this.runStep(step, host);
      }
    }
  }
}

export default TestServise;

// tslint:disable-next-line:no-unused-expression
new TestServise(fixture.hosts, fixture.steps);
