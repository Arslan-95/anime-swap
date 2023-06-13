class Token {
  constructor(details: {
    name: string;
    symbol: string;
    address: string;
    chainId?: number;
    decimals: number;
    logoURI: string;
  }) {
    Object.assign(this, details);
  }
}

export default Token;
