import { Address } from 'wagmi';

interface ITokenDetails {
  name: string;
  symbol: string;
  address: Address;
  decimals: number;
  logoURI: string;
  chainId?: number;
}

class Token implements ITokenDetails {
  constructor(
    public name: string,
    public symbol: string,
    public address: Address,
    public decimals: number,
    public logoURI: string,
    public chainId: number
  ) {}
}

export default Token;
