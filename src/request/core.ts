import axios from 'axios'
import { parseUrl, addPrefix } from './utils'
import interceptorsList from './interceptors'

class Request {
  Api: any = {}
  interceptorsList: any = interceptorsList
  axiosCreate: any = axios.create()

  constructor() {
    this.init()
  }

  init() {
    this.create()
  }

  create() {
    Object.keys(this.interceptorsList).map(key => {
      this.interceptorsList[key].map((item: { success: any; error: any }) => {
        this.axiosCreate.interceptors[key].use(item.success, item.error)
      })
    })
  }

  scope(config: object[], urlPrefix = '/api') {
    this.converMethods(config, urlPrefix)

    return this.Api
  }

  converMethods(config: object[], urlPrefix: string) {
    return ((config, urlPrefix) => {
      config.map((item: { name: string; noPre: string; url: string }) => {
        this.Api[item.name] = (options: any = {}) => {
          const isPre = item.noPre ? '' : urlPrefix
          let url: string = item.url

          url = options && options.query ? parseUrl(url, options.query) : url
          url = addPrefix(url, isPre)

          return this.axiosCreate(Object.assign({}, item, options, { url }))
        }
      })
    })(config, urlPrefix)
  }
}

export default Request
