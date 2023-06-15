interface ITokenDetails {
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  logoURI: string;
  chainId?: number;
}

class Token implements ITokenDetails {
  constructor(
    public name: string,
    public symbol: string,
    public address: string,
    public decimals: number,
    public logoURI: string,
    public chainId: number
  ) {}
}

export default Token;
