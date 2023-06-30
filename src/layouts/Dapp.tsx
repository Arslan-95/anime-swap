import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import WagmiProvider from '@services/web3/WagmiProvider';
import { mediaBreakpoints } from '@features/adaptive/breakpoints';

const SDappWrapper = styled.div`
  overflow-x: hidden;
  max-width: 100%;
`;

const SDappContent = styled.div`
  padding: 0 0 20px;

  @media ${mediaBreakpoints.tablet} {
    padding: 0 0 50px;
  }
`;

const Dapp: React.FC = () => {
  return (
    <WagmiProvider>
      <SDappWrapper>
        <Header />
        <SDappContent>
          <Outlet />
        </SDappContent>
      </SDappWrapper>
    </WagmiProvider>
  );
};

export default Dapp;
