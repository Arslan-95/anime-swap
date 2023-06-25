import styled from 'styled-components';
import { Input } from '.';
import type { InputProps, InputValue } from './types';

interface ISearchProps extends InputProps {
  onChange: (value: InputValue) => void;
}

const SInput = styled(Input)`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.025em;
`;

const Search = ({ onChange, className, ...otherProps }: ISearchProps) => (
  <SInput
    type="text"
    placeholder="Search..."
    onChange={onChange}
    className={className}
    {...otherProps}
  />
);

export default Search;
