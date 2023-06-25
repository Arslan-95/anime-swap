import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Swap from '@pages/Swap';
import * as PAGES from '@pages/PAGES';
import Theme from '@styles/Theme';
import Dapp from '@layouts/Dapp';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Theme>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Link to={PAGES.SWAP}>SWAP</Link>
              </div>
            }
          />
          <Route path={PAGES.DAPP} element={<Dapp />}>
            <Route path={PAGES.SWAP} element={<Swap />} />
          </Route>
        </Routes>
      </Theme>
    </BrowserRouter>
  );
};

export default App;
