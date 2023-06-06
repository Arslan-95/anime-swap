import React from 'react';
import { default as SwapForm } from '@features/swap/Swap';
import { Container } from '@components/ui';

const Swap: React.FC = () => {
  return (
    <Container>
      <SwapForm />
    </Container>
  );
};

export default Swap;
