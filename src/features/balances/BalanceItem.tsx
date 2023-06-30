import styled from 'styled-components';
import { TokenIcon } from '@components/dapp';
import { NumberFormat } from '@components/ui';
import Token from '@utils/classes/Token';

interface IBalanceItemProps {
  token: Token;
}

const SBalanceItem = styled.li`
  display: flex;
  align-items: center;

  padding: 13px 17px;
  background: #282828;
  border-radius: 12px;

  & + & {
    margin-top: 30px;
  }

  h5 {
    margin-left: 11px;
  }
`;

const BalanceItem = ({ token }: IBalanceItemProps) => {
  return (
    <SBalanceItem key={token.address}>
      <TokenIcon src={token.logoURI} />
      <h5>
        <NumberFormat number={token.balance} symbol={token.symbol} />
      </h5>
    </SBalanceItem>
  );
};

export default BalanceItem;
