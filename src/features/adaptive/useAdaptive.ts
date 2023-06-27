import { useAppDispatch } from '@hooks/index';
import { useEffect } from 'react';
import { setAdaptive } from './adaptiveSlice';

const useAdaptive = () => {
  const dispatch = useAppDispatch();

  const updateAdaptive = () => {
    dispatch(setAdaptive(window.innerWidth));
  };

  useEffect(() => {
    updateAdaptive();

    window.addEventListener('resize', updateAdaptive);

    return () => {
      window.removeEventListener('resize', updateAdaptive);
    };
  }, []);
};

export default useAdaptive;
