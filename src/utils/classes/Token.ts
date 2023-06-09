class Token {
  constructor(
    public name: string,
    public symbol: string,
    public address: string,
    public chainId: number,
    public decimals: number,
    public logoURI: string
  ) {}
}

export default Token;
