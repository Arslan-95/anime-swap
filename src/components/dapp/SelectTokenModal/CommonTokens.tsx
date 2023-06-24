import { MouseEventHandler } from 'react';
import styled from 'styled-components';
import Token from '@utils/classes/Token';
import { TokenIcon } from '..';
import { CustomButton } from '@components/ui';

interface ICommonTokensProps {
  tokens: Token[];
  selectedToken?: Token | null;
  className?: string;
  onChange?: MouseEventHandler<HTMLButtonElement>;
}

const SCommonTokens = styled.div`
  font-size: 15px;
  font-weight: 600;
`;

const STokensList = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;

  margin-top: 12px;
  padding-bottom: 8px;
  max-width: 100%;
  overflow-x: scroll;
`;

const SCommonToken = styled(CustomButton)`
  display: flex;
  align-items: center;
  gap: 5px;

  padding: 6.5px 10px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.light};
  transition: background 0.1s;

  font-weight: 500;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.65;
  }
`;

const CommonTokens = ({
  tokens,
  selectedToken,
  className,
  onChange,
}: ICommonTokensProps) => {
  return (
    <SCommonTokens className={className}>
      <span>Common tokens</span>
      <STokensList>
        {tokens.map((token) => (
          <SCommonToken
            disabled={selectedToken?.address === token.address}
            data-address={token.address}
            key={token.address}
            onClick={onChange}
          >
            <TokenIcon src={token.logoURI} size={24} />
            <span>{token.symbol?.toUpperCase()}</span>
          </SCommonToken>
        ))}
      </STokensList>
    </SCommonTokens>
  );
};

export default CommonTokens;
