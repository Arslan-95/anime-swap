import { MouseEventHandler } from 'react';
import styled from 'styled-components';
import Token from '@utils/classes/Token';
import { TokenIcon } from '..';
import { CustomButton, ScrollBlock } from '@components/ui';

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

const STokensWrapper = styled.div`
  margin-top: 12px;
  max-width: 100%;
`;

const STokensList = styled.ul`
  display: flex;
  align-content: center;
  gap: 13px;

  padding: 0 0 8px;
  list-style: none;
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
      <STokensWrapper>
        <ScrollBlock>
          <STokensList>
            {tokens.map((token) => (
              <li key={token.address}>
                <SCommonToken
                  disabled={selectedToken?.address === token.address}
                  data-address={token.address}
                  onClick={onChange}
                >
                  <TokenIcon src={token.logoURI} size={24} />
                  <span>{token.symbol?.toUpperCase()}</span>
                </SCommonToken>
              </li>
            ))}
          </STokensList>
        </ScrollBlock>
      </STokensWrapper>
    </SCommonTokens>
  );
};

export default CommonTokens;
