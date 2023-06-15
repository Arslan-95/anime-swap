import { InputProps } from '@components/ui/types';
import Token from '@utils/classes/Token';

export interface AmountInputProps
  extends Omit<InputProps, 'onChange' | 'value'> {
  value: number | undefined;
  onChange?: (value: number | undefined) => void;
}

export type OnTokenChange = (token: Token) => void;
