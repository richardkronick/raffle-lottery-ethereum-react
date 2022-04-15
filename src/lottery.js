import web3 from './web3';

// Ethereum address of the lottery contract.
const address = '0x72E67b75EA7F21D704618eFCA3ae84eF64e5F4D1';

// ABI for the lottery contract. 
const abi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
    constant: undefined,
    payable: undefined,
    signature: 'constructor'
  },
  {
    inputs: [],
    name: 'getParticipants',
    outputs: [ [{ name: "", type: "address[]" }] ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0x5aa68ac0'
  },
  {
    inputs: [],
    name: 'getRaffleCurrentValue',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0xeca8c800'
  },
  {
    inputs: [],
    name: 'joinRaffle',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
    constant: undefined,
    payable: true,
    signature: '0x136b3392'
  },
  {
    inputs: [],
    name: 'manager',
    outputs: [ [{ name: "", type: "address" }] ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0x481c6a75'
  },
  {
    inputs: [],
    name: 'numPlayers',
    outputs: [ [{ name: "", type: "uint256" }] ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0x97b2f556'
  },
  {
    inputs: [ [Object] ],
    name: 'players',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0xf71d96cb'
  },
  {
    inputs: [],
    name: 'selectWinnerRestricted',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    constant: undefined,
    payable: undefined,
    signature: '0x17b96fce'
  },
  {
    inputs: [],
    name: 'winner',
    outputs: [ [{ name: "", type: "address" }] ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0xdfbf53ae'
  },
  {
    inputs: [],
    name: 'winnerHasBeenChosen',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0x966b8c1d'
  }
]

  // Export local instance of the contract for use in this react project.
  export default new web3.eth.Contract(abi, address);