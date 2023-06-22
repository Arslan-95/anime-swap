import { bscTestnet, bsc } from 'viem/chains';
import { configureChains, createConfig } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';
import { walletConnectID } from '@services/config';
import noderealRPC from './noderealRPC';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [bscTestnet, bsc],
  [
    publicProvider(),
    jsonRpcProvider({
      rpc: (chain) => {
        let http = null;
        let webSocket = null;
        let rpc = null;

        if (noderealRPC[chain.id]) {
          http = noderealRPC[chain.id].http;
          webSocket = noderealRPC[chain.id].webSocket;

          rpc = {
            http,
            webSocket,
          };
        }

        return rpc;
      },
    }),
  ]
);
const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [
    new MetaMaskConnector({
      chains,
      options: {
        shimDisconnect: true,
        UNSTABLE_shimOnConnectSelectAccount: true,
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: walletConnectID,
        showQrModal: true,
      },
    }),
  ],
});

export default config;
