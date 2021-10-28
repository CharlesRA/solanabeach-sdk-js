import { ApiClient } from "./api-client"
import { Block, TopPrograms, Account, StakeReward, Token, Transaction, StakeAccounts } from "./types"
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

  //                                    BLOCK                                    //

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
   * @param limit Result limit (max 100)
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
  //                                    Account                                    //

  /**
   * Fetch account data
   * @param pubkey Account address
   */

  public async fetchAccountData(pubkey: string): Promise<Account> {
    return await this.apiClient.getRequest(`/account/${pubkey}`)
  }

  /**
   * Fetch stake account rewards by the stake account pubkey
   * @param stake_pubkey Account address
   * @param cursor Epoch Cursor
   */
  public async fetchAccountStakeRewards(stake_pubkey: string, props?: { cursor?: string }): Promise<StakeReward[]> {
    return await this.apiClient.getRequest(`/account/${stake_pubkey}/stake-rewards`, props)
  }

  /**
   * Fetch account tokens
   * @param pubkey Account address
   * @param limit Result limit (max 100)
   * @param offset Result offset
   */
  public async fetchAccountTokens(stake_pubkey: string, props?: { limit?: string; offset?: string }): Promise<Token[]> {
    return await this.apiClient.getRequest(`/account/${stake_pubkey}/tokens`, props)
  }

  /**
   * Fetch account tokens
   * @param pubkey Account address
   * @param limit Result limit (max 1000)
   * @param offset Result offset
   * @param cursor Transaction cursor (blocknumber,txindex)
   */
  public async fetchAccountTransactions(
    pubkey: string,
    props?: { limit?: string; offset?: string; cursor?: string },
  ): Promise<Transaction[]> {
    return await this.apiClient.getRequest(`/account/${pubkey}/transactions`, props)
  }

  /**
   * Fetch stake accounts owned by the pubkey
   * @param pubkey Account address
   * @param limit Result limit (max 1000)
   * @param offset Result offset
   */
  public async fetchStakeAccounts(
    pubkey: string,
    props?: { limit?: string; offset?: string },
  ): Promise<StakeAccounts[]> {
    return await this.apiClient.getRequest(`/account/${pubkey}/stakes`, props)
  }
}
