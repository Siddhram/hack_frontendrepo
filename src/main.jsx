import { StrictMode } from 'react';
import React from 'react';

import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Newz from './components/News.jsx';
import Image from './components/Image.jsx';
import AppwriteFileManager from './components/AppwriteFileManager.jsx';
import Video from './components/Video.jsx';
import Transcript from './components/Transcript.jsx';
import Voice from './Voice.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout></Layout>} >
          <Route path='' element={<App></App>}></Route>
         <Route path='news' element={<Newz></Newz>}></Route>
                  <Route path='images' element={<Image></Image>}></Route>
         <Route path='videos' element={<Video></Video>}></Route>
         <Route path='transcript' element={<Transcript></Transcript>}></Route>

        </Route>

        <Route path='/about' element={<Voice></Voice>}></Route>
                <Route path='/contact' element={<div>contact</div>}></Route>

      </Routes>
    </BrowserRouter>
  </StrictMode>
);
