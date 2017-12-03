interface header {
  [key: string]: string
}

interface host {
  url: string
  headers?: header
}

interface scene {
  url: string
  count?: number
  parallel?: number
  delay?: number
  method?: "POST" | "GET" | "PUT"
  headers?: header
  params?: string | { [key: string]: any }
  data?: string | { [key: string]: any }
}

interface step {
  name: string
  scene: scene[]
  count?: number
  headers?: header
  parallel?: number
  delay?: number
}

interface scheme {
  steps: step[]
}