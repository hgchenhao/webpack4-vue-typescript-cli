// import store from '@/store';
import router from '@/router'
// import * as types from '@/store/mutation-types';
import defaultOptions from './defaultOptions'

// 状态码
const statusCode = {
  EXPIRED_CREDENTIAL: 5,
}

interface RequestConfig {
  headers: {
    Accept: string
    'X-CSRF-Token': string
    'X-Auth-Token': string
  }
}

export default {
  request: [
    {
      success: (config: RequestConfig) => {
        config.headers.Accept = defaultOptions.headers['Accept']

        // if (store.state.token) {
        //   config.headers['X-CSRF-Token'] = store.state.token;
        // }

        return config
      },
      error: (error: object) => Promise.reject(error),
    },
  ],
  response: [
    {
      success: (res: any = {}) => {
        console.log('resSuccess', res.data)
        return res.data
      },
      error: (error: any = {}) => {
        console.log('resError', error)

        if (!error.response) {
          console.log(error)
          error.message = '网络问题，请联系管理员'
          return Promise.reject(error)
        }

        switch (error.response.status) {
          case 401:
            const code = error.response.data.error.code
            // token过期的情况
            if (code === statusCode.EXPIRED_CREDENTIAL) {
              // store.commit(types.USER_LOGOUT);

              router.replace({
                name: 'login',
                query: { redirect: router.currentRoute.name },
              })
            }
            break
          default:
            break
        }

        return Promise.reject(error.response.data.error)
      },
    },
  ],
}
