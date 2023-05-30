import React from 'react';
import Swap from '@pages/Swap';
import Theme from '@/styles/Theme';
import Dapp from './layouts/Dapp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Theme>
        <Routes>
          <Route path="dapp" element={<Dapp />}>
            <Route path="swap" element={<Swap />} />
          </Route>
        </Routes>
      </Theme>
    </BrowserRouter>
  );
};

export default App;
