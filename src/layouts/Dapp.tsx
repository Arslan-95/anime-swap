import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const SDappWrapper = styled.div``;

const Dapp: React.FC = () => {
  return (
    <SDappWrapper>
      <Outlet />
    </SDappWrapper>
  );
};

export default Dapp;
