import requestPromise from "request-promise-native"
import { URLSearchParams } from "url"

export class ApiClient {
  constructor(private apiKey: string, private apiBaseUrl: string) {}

  public async getRequest(path: string, props?: Record<string, string>) {
    let queryParameters = new URLSearchParams(props)
    console.log(this.apiBaseUrl + path + queryParameters.toString())
    const res = await requestPromise.get({
      uri: this.apiBaseUrl + path + `?${queryParameters.toString()}`,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
      json: true,
      resolveWithFullResponse: true,
    })

    return res.body
  }
}
