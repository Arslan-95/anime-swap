// type TokenName = string;
type TokenSymbol = string;
// type TokenAddress = string;
// type TokenChainId = number;
// type TokenDecimals = number;
// type TokenLogoURI = number;

export interface ITokenDetails {
  // name: TokenName;
  symbol: TokenSymbol;
  // address: TokenAddress;
  // chainId: TokenChainId;
  // decimals: TokenDecimals;
  // logoURI: TokenLogoURI;
}

class Token {
  constructor(
    // public name: TokenName,
    public symbol: TokenSymbol,
    // public address: TokenAddress,
    // public chainId: TokenChainId,
    // public decimals: TokenDecimals,
    // public logoURI: TokenLogoURI
  ) {}
}

export default Token;
