import React from 'react';
import styled, { css } from 'styled-components';
import SwapForm from '@features/swap/SwapForm';
import { Container } from '@components/ui';
import Balances from '@features/balances/Balances';
import { mediaBreakpoints } from '@features/adaptive/breakpoints';

const SSwapWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 47px;
  width: 100%;
  margin: 0 auto;

  @media ${mediaBreakpoints.tablet} {
    flex-direction: column;
    align-items: center;
  }
`;

const childrenBoxesCss = css`
  flex: 1 1 auto;

  @media ${mediaBreakpoints.tablet} {
    width: 100%;
  }
`;

const SSwapForm = styled(SwapForm)`
  ${childrenBoxesCss}
`;
const SBalances = styled(Balances)`
  ${childrenBoxesCss}
`;

const Swap: React.FC = () => {
  return (
    <Container>
      <SSwapWrapper>
        <SSwapForm />
        <SBalances />
      </SSwapWrapper>
    </Container>
  );
};

export default Swap;
