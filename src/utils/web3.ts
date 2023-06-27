import { Address } from 'wagmi';

export const getShortAddress = (address: Address) => {
  return address.slice(0, 2) + '...' + address.slice(-4);
};
