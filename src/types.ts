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
