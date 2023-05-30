import React from 'react';
import styled from 'styled-components';

interface SContainerProps {
  maxWidth?: string;
  padding?: string;
}

interface Props extends SContainerProps {
  children?: React.ReactNode;
  className?: string;
}

const SContainer = styled.div<SContainerProps>`
  max-width: ${(props) => `calc(${props.maxWidth} + ${props.padding} * 2)`};
  width: 100%;
  margin: 0 auto;
  padding: 0 ${(props) => props.padding};
`;

const Container: React.FC<Props> = ({
  children,
  className,
  maxWidth = '1320px',
  padding = '30px',
}) => {
  return (
    <SContainer padding={padding} maxWidth={maxWidth} className={className}>
      {children}
    </SContainer>
  );
};

export default Container;
