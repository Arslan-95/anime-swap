import styled, { keyframes } from 'styled-components';

interface ICircleLoadingProps {
  className?: string;
  size?: number;
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const SCircle = styled.i<ICircleLoadingProps>`
  display: inline-block;
  height: ${({ size }) => size || 20}px;
  width: ${({ size }) => size || 20}px;
  border-top: 3px solid ${({ theme }) => theme.colors.main};
  border-right: 3px solid ${({ theme }) => theme.colors.main};
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
  position: relative;
`;

const CircleLoading = ({ className, size }: ICircleLoadingProps) => {
  return <SCircle className={className} size={size} />;
};

export default CircleLoading;
