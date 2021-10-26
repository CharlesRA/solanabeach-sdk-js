interface Blocktime {
  absolute: number
  relative: number
}

interface Identity {
  name: string
  address: string
}

interface Program {
  count: number
  programId: Identity
  instructions: {
    NewOrderV3?: number
    ConsumeEvents?: number
    CancelOrderByClientIdV2?: number
    Transfer?: number
    CloseAccount?: number
    InitializeAccount?: number
    Memo?: number
    CreateAssociatedTokenAccount?: number
    Burn?: number
    MintToChecked?: number
    Revoke?: number
    TransferChecked: number
    SetAuthority: number
    Approve: number
    MintTo: number
    InitializeMint: number
  } // TODO fill this
}

interface Address {
  address: string
}

interface Mint {
  name?: string
  ticker?: string
  logo?: string
  meta?: { url: string }
  cmcId?: string
  address: string
}

export interface Account {
  type: "unknown" | "token" | "stake" | string
  value: {
    base: {
      address: Address
      balance: number
      executable: boolean
      owner: Identity | null
      rentEpoch: number
      dataSize: number
    }
    extended: {
      authorized?: {
        staker: Address
        withdrawer: Address
      }
      lockup?: {
        timestamp: number
        epoch: number
        custodian: Address
      }
      activationEpoch?: number
      deactivationEpoch?: number
      validator?: string
      validatorInfo?: {
        name: string
        website: string
        identityPubkey: string
        keybaseUsername: string
        details: string
        image: string
      }
      mint?: Mint
      owner?: Address
      amount?: number
      delegate?: Identity
      delegatedAmount?: number
      closeAuthority?: Identity
      state?: "Initialized" | "active" | string
      decimals?: number
      stake: number
      activeStake: number
      inactiveStake: number
    }
  }
}

export interface TopPrograms {
  window: number
  programs: Program[]
}

export interface Block {
  blocknumber: number
  blockhash: string
  previosblockhash: string
  parentslot: number
  blocktime: Blocktime
  metrics: {
    txcount: number
    failedtxs: number
    totalfees: number
    instructions: number
    sucessfultxs: number
    totalvaluemoved: number
    innerinstructions: number
  }
  rewards: {
    pubkey: string
    lamports: number
    commission: null // Maybe this field is not always null
    rewardType: "Rent" | string
    postBalance: number
  }[]
  proposer: string
  ondemand: boolean
  proposerData: {
    name?: string
    website?: string
    image?: string
    nodePubkey: string
  }
  programstats: Program[]
}
