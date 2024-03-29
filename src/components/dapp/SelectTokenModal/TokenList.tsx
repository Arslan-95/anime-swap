import { MouseEventHandler, useMemo } from 'react';
import styled from 'styled-components';
import Token from '@utils/classes/Token';
import { CustomButton, ScrollBlock } from '@components/ui';
import { TokenIcon } from '..';
import { getFixedNumber } from '@utils/numbers';

interface ITokensListProps {
  selectedToken?: Token | null;
  onChange?: MouseEventHandler<HTMLButtonElement>;
  list: Token[];
  maxHeight?: number;
}

const STokenList = styled.div`
  ul {
    padding: 0;
    list-style: none;
  }
`;

const STokenItem = styled(CustomButton)`
  display: flex;

  width: 100%;
  padding: 5px 17px;
  border-radius: 12px;
  transition: background 0.1s;

  text-align: left;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const STokenDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const STokenTitles = styled.div`
  display: flex;
  flex-direction: column;

  span {
    line-height: 150%;

    &:first-child {
      font-size: 15px;
      font-weight: 600;
    }

    &:last-child {
      font-size: 14px;
    }
  }
`;

const STokenBalance = styled.span`
  margin-left: auto;

  font-family: PocketMonk;
  font-size: 14px;
`;

const TokenList = ({ list, onChange, maxHeight }: ITokensListProps) => {
  const sortedList = useMemo(
    () => list.sort((a, b) => Number(b.balance) - Number(a.balance)),
    [list]
  );

  return (
    <STokenList>
      <ScrollBlock maxHeight={maxHeight}>
        <ul>
          {sortedList.map((token) => {
            return (
              <li key={token.address}>
                <STokenItem data-address={token.address} onClick={onChange}>
                  <STokenDetails>
                    <TokenIcon size={24} src={token.logoURI} />
                    <STokenTitles>
                      <span>{token.symbol}</span>
                      <span>{token.name}</span>
                    </STokenTitles>
                  </STokenDetails>
                  <STokenBalance>
                    {token.balance ? getFixedNumber(token.balance, 5) : 0}
                  </STokenBalance>
                </STokenItem>
              </li>
            );
          })}
        </ul>
      </ScrollBlock>
    </STokenList>
  );
};

export default TokenList;
