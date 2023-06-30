import { ReactNode } from 'react';
import styled from 'styled-components';

interface IScrollBlockProps {
  children?: ReactNode;
  className?: string;
  maxHeight?: number;
}

const SScrollBlock = styled.div<IScrollBlockProps>`
  max-height: ${({ maxHeight }) => maxHeight && maxHeight + 'px'};
  max-width: 100%;
  overflow: auto;
  scrollbar-color: #282828 rgba(40, 40, 40, 0.48);

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 2px;
    background-color: rgba(40, 40, 40, 0.48);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: #282828;

    &:hover {
      background-color: #3c3c3c;
    }
  }
`;

const ScrollBlock = ({ children, maxHeight, className }: IScrollBlockProps) => {
  return (
    <SScrollBlock maxHeight={maxHeight} className={className}>
      {children}
    </SScrollBlock>
  );
};

export default ScrollBlock;
