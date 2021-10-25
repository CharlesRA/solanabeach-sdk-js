import { ApiClient } from "./api-client"
import { Block, TopPrograms } from "./types"
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
  /**
   * Fetch 50 latest blocks ordered by block number
   */
  public async fetchLatestBlocks(props?: { limit?: string; cursor?: string }): Promise<Block[]> {
    return await this.apiClient.getRequest(`/latest-blocks`, props)
  }

  /**
   * Fetch top program stats for last 1000 blocks
   */

  public async fetchTopPrograms(): Promise<TopPrograms> {
    return await this.apiClient.getRequest(`/top-programs`)
  }
}
