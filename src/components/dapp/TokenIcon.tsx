import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface ITokenIconProps {
  src?: string;
  size?: number;
}

const STokenIcon = styled.img<ITokenIconProps>`
  object-fit: contain;
  height: ${({ size }) => size || 37}px;
  width: ${({ size }) => size || 37}px;
  border-radius: 50%;
`;

const SEmptyIcon = styled.div<ITokenIconProps>`
  height: ${({ size }) => size || 37}px;
  width: ${({ size }) => size || 37}px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.light};
`;

const TokenIcon = ({ src, size = 37 }: ITokenIconProps) => {
  const iconRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!src) return;
    setIsLoaded(false);
    setIsError(false);

    const icon = new Image();

    const handleLoad = () => {
      setIsLoaded(true);
    };
    const handleError = () => {
      setIsError(true);
    };

    icon.addEventListener('load', handleLoad);
    icon.addEventListener('error', handleError);
    icon.src = src;

    return () => {
      icon.removeEventListener('load', handleLoad);
      icon.removeEventListener('error', handleError);
    };
  }, [src]);

  if (src && isLoaded && !isError) {
    return <STokenIcon size={size} ref={iconRef} src={src} />;
  }

  return <SEmptyIcon size={size} />;
};

export default TokenIcon;
