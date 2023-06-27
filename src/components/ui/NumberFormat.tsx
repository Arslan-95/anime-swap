import { getFixedNumber } from '@utils/numbers';

interface INumberFormatProps {
  number: number | string;
  symbol?: string;
}

const NumberFormat = ({ number, symbol }: INumberFormatProps) => {
  return (
    <span>
      {getFixedNumber(number, 2)}&nbsp;
      {symbol && symbol.toUpperCase()}
    </span>
  );
};

export default NumberFormat;
