import type { AxiosRequestConfig, AxiosResponse } from 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    // 添加新的请求参数配置
    callbackParamName?: string
  }
}

type JsonpScripeElement = HTMLScriptElement & { onreadystatechange?: HTMLScriptElement['onload'], readyState?: string }

let cid = 1

function buildParams(params: AxiosRequestConfig['params']): string {
  const result = []

  for (const i in params) {
    result.push(`${encodeURIComponent(i)}=${encodeURIComponent(params[i])}`)
  }

  return result.join('&')
}

export async function jsonpAdapter<T>(config: AxiosRequestConfig<T>): Promise<AxiosResponse<T>> {
  // const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

  return new Promise<AxiosResponse>((resolve, reject) => {
    let script: JsonpScripeElement | null = document.createElement('script')
    let src = config.url || ''

    if (config.params) {
      const params = buildParams(config.params)

      if (params) {
        src += (src.includes('?') ? '&' : '?') + params
      }
    }

    script.async = true

    const remove = (): void => {
      if (script) {
        script.onload = script.onreadystatechange = script.onerror = null

        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }

        script = null
      }
    }

    const jsonp = `axiosJsonpCallback${cid++}`
    const old = (window as any)[jsonp]
    let isAbort = false;

    (window as any)[jsonp] = (responseData: T) => {
      (window as any)[jsonp] = old

      if (isAbort) {
        return
      }

      const response: AxiosResponse<T> = {
        data: responseData,
        status: 200,
        headers: {}, // 响应头
        statusText: 'OK', // 状态文本
        config: config as AxiosResponse['config'],
      }

      resolve(response)
    }

    const additionalParams: Record<string, string | number> = {
      _: (new Date().getTime()),
    }

    additionalParams[config.callbackParamName || 'callback'] = jsonp

    src += (src.includes('?') ? '&' : '?') + buildParams(additionalParams)

    script.onload = script.onreadystatechange = () => {
      if (!script!.readyState || /loaded|complete/.test(script!.readyState)) {
        remove()
      }
    }

    script.onerror = () => {
      remove()

      reject(new Error('Network Error'))
    }

    if (config.cancelToken) {
      config.cancelToken.promise.then((cancel) => {
        if (!script)
          return

        isAbort = true

        reject(cancel)
      })
    }

    script.src = src

    document.head.appendChild(script)
  })
}
