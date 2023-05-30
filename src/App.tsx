import React from 'react';
import Swap from '@pages/Swap';
import Theme from '@/styles/Theme';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Theme>
      <BrowserRouter>
        <Routes>
          <Route path="/swap" element={<Swap />} />
        </Routes>
      </BrowserRouter>
    </Theme>
  );
};

export default App;
