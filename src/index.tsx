import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { App } from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <RecoilRoot>
    <HashRouter>
      <App />
    </HashRouter>
  </RecoilRoot>
);
