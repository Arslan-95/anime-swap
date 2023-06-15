import styled from 'styled-components';
import { Input } from '.';
import type { InputValue } from './types';

interface ISearchProps {
  onChange: (value: InputValue) => void;
}

const SInput = styled(Input)`
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.025em;
`;

const Search = ({ onChange }: ISearchProps) => {
  return <SInput type="text" placeholder="Search..." onChange={onChange} />;
};

export default Search;
