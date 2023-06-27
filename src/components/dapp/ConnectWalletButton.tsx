import { useContext } from 'react';
import { useConnect } from 'wagmi';
import { Button } from '@components/ui';
import { WagmiContext } from '@services/web3/WagmiProvider';
import { IWagmiContext } from '@services/types';

interface IConnectWalletButtonProps {
  connectorId: 'metaMask' | 'walletConnect';
  title: string;
  className?: string;
}

const ConnectWalletButton = ({
  connectorId,
  title,
  className,
}: IConnectWalletButtonProps) => {
  const { connect, connectors, isLoading } = useConnect();
  const { isConnected } = useContext(WagmiContext) as IWagmiContext;
  const connector = connectors.find(({ id }) => id === connectorId);

  const handleConnect = () => {
    connect({ connector });
  };

  return (
    <Button
      size="small"
      onClick={handleConnect}
      disabled={!connector || isLoading || isConnected}
      className={className}
    >
      {title}
    </Button>
  );
};

export default ConnectWalletButton;
