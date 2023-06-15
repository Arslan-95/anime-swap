import { mainnet } from 'wagmi';
import { bsc, bscTestnet } from 'viem/chains';

type ChainRPC = {
  http: string;
  webSocket: string;
};

type NoderealRPC = {
  [key: number]: ChainRPC;
};

const noderealRPC: NoderealRPC = {
  [mainnet.id]: {
    http: 'https://eth-mainnet.nodereal.io/v1/3d5acd9893b64d55ab9c33989ea6c151',
    webSocket:
      'wss://eth-goerli.nodereal.io/ws/v1/3d5acd9893b64d55ab9c33989ea6c151',
  },
  [bscTestnet.id]: {
    http: 'https://bsc-testnet.nodereal.io/v1/3d5acd9893b64d55ab9c33989ea6c151',
    webSocket:
      'wss://bsc-testnet.nodereal.io/ws/v1/3d5acd9893b64d55ab9c33989ea6c151',
  },
  [bsc.id]: {
    http: 'https://bsc-mainnet.nodereal.io/v1/3d5acd9893b64d55ab9c33989ea6c151',
    webSocket:
      'wss://bsc-mainnet.nodereal.io/ws/v1/3d5acd9893b64d55ab9c33989ea6c151',
  },
};

export default noderealRPC;
