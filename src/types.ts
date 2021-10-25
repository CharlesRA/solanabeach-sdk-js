interface Blocktime {
  absolute: number
  relative: number
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
    name: string
    website: string
    image: string
    nodePubkey: string
  }
}
