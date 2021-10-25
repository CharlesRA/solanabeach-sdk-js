import requestPromise from "request-promise-native"

export class ApiClient {
  constructor(private apiKey: string, private apiBaseUrl: string) {}

  public async getRequest(path: string) {
    const res = await requestPromise.get({
      uri: this.apiBaseUrl + path,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
      json: true,
      resolveWithFullResponse: true,
    })

    return res.body
  }
}
