import React from 'react';
import Swap from '@pages/Swap';
import Theme from '@/styles/Theme';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Theme>
        <Routes>
          <Route path="dapp/swap" element={<Swap />} />
        </Routes>
      </Theme>
    </BrowserRouter>
  );
};

export default App;
