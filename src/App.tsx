import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Swap from '@pages/Swap';
import * as PAGES from '@pages/PAGES';
import Theme from '@styles/Theme';
import Dapp from '@layouts/Dapp';
import useAdaptive from '@features/adaptive/useAdaptive';

const App = () => {
  useAdaptive();

  return (
    <BrowserRouter>
      <Theme>
        <Routes>
          <Route path="*" element={<Navigate to={PAGES.SWAP} replace />} />
          <Route path={PAGES.DAPP} element={<Dapp />}>
            <Route path={PAGES.SWAP} element={<Swap />} />
            <Route
              path={PAGES.DAPP}
              element={<Navigate to={PAGES.SWAP} replace />}
            />
          </Route>
        </Routes>
      </Theme>
    </BrowserRouter>
  );
};

export default App;
