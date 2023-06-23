import { getFixedNumber } from '@utils/numbers';

interface INumberProps {
  number: number | string;
  symbol?: string;
}

const Number = ({ number, symbol }: INumberProps) => {
  return (
    <span>
      {getFixedNumber(number, 2)}&nbsp;
      {symbol && symbol.toUpperCase()}
    </span>
  );
};

export default Number;
