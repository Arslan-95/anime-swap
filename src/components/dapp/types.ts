import { InputProps } from '@components/ui/types';

export interface AmountInputProps
  extends Omit<InputProps, 'onChange' | 'value'> {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
}

export type IToken = {
  symbol: string;
};

export type OnTokenChange = (token: IToken) => void;
