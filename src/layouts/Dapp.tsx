import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import WagmiProvider from '@services/web3/WagmiProvider';

const SDappWrapper = styled.div``;

const Dapp: React.FC = () => {
  return (
    <WagmiProvider>
      <SDappWrapper>
        <Header />
        <Outlet />
      </SDappWrapper>
    </WagmiProvider>
  );
};

export default Dapp;
