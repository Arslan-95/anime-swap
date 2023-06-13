import React from 'react';
import styled from 'styled-components';
import { Box } from '@components/ui';
import CurrencyAmount from '@components/dapp/CurrencyAmount';
import testToken from '@services/testToken';
// import { getContract } from '@wagmi/core';

import {
  erc20ABI,
  useAccount,
  // useBalance,
  useConnect,
  useDisconnect,
  usePrepareContractWrite,
  // useNetwork,
} from 'wagmi';
// import { erc20ABI } from 'wagmi';

type Props = {
  children?: React.ReactNode;
};

const SwapBox = styled(Box)`
  width: 100%;
  max-width: 500px;

  h2 {
    text-align: center;
  }
`;

const A = () => {
  const { isConnected } = useAccount();
  const { connect, connectors, error } = useConnect();

  // const { chain } = useNetwork();
  const { disconnect } = useDisconnect();
  // const { data: balance } = useBalance({
  //   address,
  //   token: '0xC7b9dA3D064a918B8e04B23AEEdBD64CBa21D37d',
  // });

  // const init = async () => {
  //   if (!address || !chain) return;

  //   const swapParams = {
  //     fromTokenAddress: '0x55d398326f99059fF775485246999027B3197955' as const, // The address of the token you want to swap from (1INCH)
  //     toTokenAddress: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3', // The address of the token you want to swap to (DAI)
  //     amount: '100000000000000000', // The amount of the fromToken you want to swap (in wei)
  //     fromAddress: address, // Your wallet address from which the swap will be initiated
  //     slippage: 1, // The maximum acceptable slippage percentage for the swap (e.g., 1 for 1%)
  //     disableEstimate: false, // Whether to disable estimation of swap details (set to true to disable)
  //     allowPartialFill: false, // Whether to allow partial filling of the swap order (set to true to allow)
  //   };
  // };

  // React.useEffect(() => {
  //   if (!isConnected) return;

  //   init();
  // }, [isConnected]);

  return (
    <>
      <div>
        <h3>address</h3>
        {/* {balance && <h5>{balance.formatted}</h5>} */}
        {isConnected ? (
          <button onClick={() => disconnect()}>Disconnect</button>
        ) : (
          <button
            onClick={() => {
              const connector = connectors.find(
                (connector) => connector.id === 'metaMask'
              );

              connect({ connector });
            }}
          >
            METAMASK
          </button>
        )}
      </div>
      {error && <div>{error.message}</div>}
    </>
  );
};

const Swap: React.FC<Props> = () => {
  const [fromAmount, setFirstAmount] = React.useState<number>();

  const handleFirstAmountChange = (value: number | undefined) => {
    setFirstAmount(value);
  };

  return (
    <SwapBox>
      <h2>SWAP</h2>
      <CurrencyAmount
        value={fromAmount}
        onChange={handleFirstAmountChange}
        placeholder="0.00"
        token={testToken}
        onTokenChange={() => {
          // ...
        }}
      />
      <A />
    </SwapBox>
  );
};

export default Swap;
