import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';

const SDappWrapper = styled.div``;

const Dapp: React.FC = () => {
  return (
    <SDappWrapper>
      <Header />
      <Outlet />
    </SDappWrapper>
  );
};

export default Dapp;
