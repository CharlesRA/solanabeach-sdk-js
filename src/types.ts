type Blocktime = {
  absolute: number
  relative: number
}

type Identity = {
  name: string
  address: string
}

interface Meta {
  err: string | null
  fee: number
  status: { Ok: string | null }
  logMessages: string[]
  preBalances: number[]
  postBalances: number[]
  preTokenBalances?: TokenBalance[]
  postTokenBalances?: TokenBalance[]
}

type Program = {
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

type Address = {
  address: string
}

type Mint = {
  name?: string
  ticker?: string
  logo?: string
  meta?: { url: string }
  cmcId?: string
  address: string
}

interface TokenBalance {
  accountIndex: number
  mint: Mint
  uiTokenAmount: { amount: string; decimals: number; uiAmount: string; uiAmountString: string }
}

interface MostImportantInstruction {
  name: string
  weight: number
  index: number
}

interface InstructionTransferChecked {
  amount: number
  decimals: number
  source: Address
  mint: {
    name: string
    ticker: string
    logo: string
    meta: Meta
    address: string
  }
  destination: Address
  owner: Address
  signers: Address[]
  writable: Address[]
}

interface InstructionSplit {
  lamports: number
  stakePubkey: Address
  splitStakePubkey: Address
  authorizedPubkey: Address
  signers: Address[]
  writable: Address[]
}

interface NameWithAddress {
  name: string
  address: string
}

interface InstructionCreateAssociatedTokenAccount {
  fundingAccount: Address
  associatedTokenAccount: Address
  walletAccount: Address
  tokenMint: Address
  systemProgram: NameWithAddress
  tokenProgram: NameWithAddress
  rentSysVar: NameWithAddress
  signers: Address[]
  writable: string[]
}

interface InstructionCreateAccountWithSeed {
  base: Address
  seed: string
  lamports: number
  space: number
  owner: NameWithAddress
  fundingAccount: Address
  newAccount: Address
  signers: Address[]
  writable: Address[]
}

interface InstructionDeactivate {
  stakePubkey: Address
  clockSysVar: NameWithAddress
  authorizedPubkey: Address
  signers: Address[]
  writable: Address[]
}

interface InstructionWithdraw {
  lamports: number
  stakePubkey?: Address
  toPubkey?: Address
  authorizedPubkey?: Address
  signers: Address[]
  clockSysVar: NameWithAddress
  stakeHistorySysVar: NameWithAddress
  writable: Address
}

interface InstructionAuthorize {
  newAuthorized: Address
  stakePubkey: Address
  authorizedPubkey: Address
}

interface InstructionCreateAccount {
  fundingAccount: Address
  newAccount: Address
}

interface InstructionSwap {
  tokenSwap: Address
  destinationAccount: Address
}

export interface InstructionInitialize {
  lockup: {
    unixTimestamp: number
    epoch: number
    custodian: Address
  }
}

export interface InstructionTransfer {
  amount?: number
  decimals?: number
  lamports: number
  account?: Address
  recipient?: Address
  source?: Address
  owner?: Address
  destination?: Address
  // mint?: TokenMint || Not available on /address/ routes
}

interface InstructionTypes {
  // todo add undefined
  TransferChecked?: InstructionTransferChecked
  Transfer?: InstructionTransfer
  CreateAssociatedTokenAccount?: InstructionCreateAssociatedTokenAccount
  Split?: InstructionSplit
  CreateAccountWithSeed?: InstructionCreateAccountWithSeed
  Deactivate?: InstructionDeactivate
  Withdraw?: InstructionWithdraw
  Authorize?: InstructionAuthorize
  CreateAccount?: InstructionCreateAccount
  Initialize?: InstructionInitialize
  Swap?: InstructionSwap
}

export interface StakeAccounts {
  totalPages: number
  data: {
    pubkey: Address
    lamports: number
    data: {
      state: number
      meta: {
        rent_exempt_reserve: number
        authorized: {
          staker: Address
          withdrawer: Address
        }
        lockup: {
          unix_timestamp: number
          epoch: number
          custodian: Identity
        }
      }
      stake: {
        delegation: {
          voter_pubkey: Address
          stake: number
          activation_epoch: number
          deactivation_epoch: number
          warmup_cooldown_rate: number
          validatorInfo: {
            name: string
            website: string
            identityPubkey: string
            keybaseUsername: string
            details: string
            image: string
          }
        }
        credits_observed: number
      }
    }
  }[]
}

export interface Transaction {
  accounts: { account: Address }[]
  transactionHash: string
  blockNumber: number
  index?: number
  header: {
    numRequiredSignatures: number
    numReadonlySignedAccounts: number
    numReadonlyUnsignedAccounts: number
  }
  instructions: {
    innerInstructions?: {
      parsed?: InstructionTypes
    }[]
    parsed: InstructionTypes
  }[]
  recentBlockhash: string
  signatures: string[]
  meta: Meta
  valid: boolean
  blocktime: Blocktime
  mostImportantInstruction: MostImportantInstruction
  smart: {
    type: "address" | "text" | "amount"
    value: string | number | Address
  }[]
}

export interface Token {
  address: Address
  amount: number
  decimals: number
  mint: Mint
}

export interface StakeReward {
  epoch: number
  effectiveSlot: number
  amount: number
  postBalance: number
  percentChange: number
  apr: number
  timestamp: number
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
