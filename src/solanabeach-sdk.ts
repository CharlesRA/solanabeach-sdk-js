import { ApiClient } from "./api-client"
import { Block } from "./types"
export * from "./types"

export class SolanaBeachSDK {
  private apiClient: ApiClient

  /**
   * Creates a new Solan Beach API Client
   * @param apiKey Your api key.
   * @param apiBaseUrl The API URL. Leave empty to use the default server
   */
  constructor(apiKey: string, apiBaseUrl: string = "https://prod-api.solana.surf/v1") {
    this.apiClient = new ApiClient(apiKey, apiBaseUrl)
  }

  /**
   * Fetch block by block hash if the given block exists
   * @param blockHash Block number.
   */

  public async fetchBlockByHash(blockHash: string): Promise<Block> {
    return await this.apiClient.getRequest(`/block/${blockHash}`)
  }

  /**
   * Fetch block by block number if the given block exists
   * @param blockNumber Block number.
   */
  public async fetchBlockByBlockNumber(blockNumber: number): Promise<Block> {
    return await this.apiClient.getRequest(`/block/${blockNumber}`)
  }
}
