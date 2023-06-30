import { useContext, useMemo, ReactNode } from 'react';
import styled from 'styled-components';
import { Box, NumberFormat, ScrollBlock } from '@components/ui';
import { WagmiContext } from '@services/web3/WagmiProvider';
import { IWagmiContext } from '@services/types';
import { TokenIcon } from '@components/dapp';
import { LOADING_STATUS } from '@utils/types';
import CircleLoading from '@components/ui/loadings/CircleLoading';

type IBalancesProps = {
  className?: string;
  children?: ReactNode;
};

const BalancesBox = styled(Box)`
  width: auto;
  max-width: 646px;

  h2 {
    margin-bottom: 24px;
    text-align: center;
  }

  h5 {
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0.45px;
  }
`;

const BalancesList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
`;

const BalancesItem = styled.li`
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

const SRelativeWrapper = styled.div`
  position: relative;
`;
const SCircleLoading = styled(CircleLoading)`
  position: absolute;
  top: -35px;
  right: 10px;
`;

const Balances = ({ className }: IBalancesProps) => {
  const { tokensList, isConnected, balancesLoading } = useContext(
    WagmiContext
  ) as IWagmiContext;
  const isLoading = balancesLoading === LOADING_STATUS.LOADING;
  const isIdle = balancesLoading === LOADING_STATUS.IDLE;

  const filteredTokens = useMemo(
    () => tokensList.filter((token) => Number(token.balance) > 0),
    [tokensList]
  );

  const balancesRender = () =>
    filteredTokens.map((token) => (
      <BalancesItem key={token.address}>
        <TokenIcon src={token.logoURI} />
        <h5>
          <NumberFormat number={token.balance} symbol={token.symbol} />
        </h5>
      </BalancesItem>
    ));

  const noDataRender = () => {
    if (!isConnected) {
      return <h5>Please connect your wallet</h5>;
    }

    if (!isLoading && !isIdle) {
      return <h5>No balances</h5>;
    }
  };

  return (
    <BalancesBox className={className}>
      <h2>Balances</h2>
      <SRelativeWrapper>
        {isLoading && <SCircleLoading />}
        <ScrollBlock maxHeight={418}>
          <BalancesList>
            {filteredTokens.length ? balancesRender() : noDataRender()}
          </BalancesList>
        </ScrollBlock>
      </SRelativeWrapper>
    </BalancesBox>
  );
};

export default Balances;
