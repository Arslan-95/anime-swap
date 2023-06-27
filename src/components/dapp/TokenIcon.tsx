import useIsInViewport from '@hooks/useIsInViewport';
import { LOADING_STATUS } from '@utils/types';
import { memo, useRef, useState } from 'react';
import styled from 'styled-components';

interface ITokenIconProps {
  src?: string;
  size?: number;
}

type TIconWrapperProps = Pick<ITokenIconProps, 'size'> & {
  imageIsVisible: boolean;
};
const SIconWrapper = styled.div<TIconWrapperProps>`
  height: ${({ size }) => size || 37}px;
  width: ${({ size }) => size || 37}px;
  border-radius: 50%;
  border: ${({ imageIsVisible, theme }) =>
    imageIsVisible ? '' : `1px solid ${theme.colors.light}`};

  img {
    object-fit: contain;
    border-radius: 50%;

    visibility: ${({ imageIsVisible }) =>
      imageIsVisible ? 'visible' : 'hidden'};
  }
`;
const failedIcons: { [key: string]: boolean } = {};

const TokenIcon = memo(({ src, size = 37 }: ITokenIconProps) => {
  const [loading, setLoading] = useState(LOADING_STATUS.IDLE);
  const wrapperRef = useRef(null);
  const isInViewport = useIsInViewport(wrapperRef);

  const isFailed = src && failedIcons[src];
  const isSuccessed = loading === LOADING_STATUS.SUCCESSED;

  const handleLoad = () => {
    setLoading(LOADING_STATUS.SUCCESSED);
  };

  const handleError = () => {
    setLoading(LOADING_STATUS.FAILED);

    if (src) {
      failedIcons[src] = true;
    }
  };

  return (
    <SIconWrapper
      size={size}
      imageIsVisible={!isFailed && isSuccessed}
      ref={wrapperRef}
    >
      {(isSuccessed || isInViewport) && !isFailed && (
        <img
          height={size}
          width={size}
          src={src}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
        />
      )}
    </SIconWrapper>
  );
});

export default TokenIcon;
