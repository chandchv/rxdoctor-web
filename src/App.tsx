import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';
const SymptomCheckerPage = lazy(() => import('./pages/SymptomCheckerPage'));
const GalleryFeaturePage = lazy(() => import('./pages/GalleryFeaturePage'));

function App() {
  return (
    <>
      <Suspense fallback={<div style={{ padding: 24, color: '#6b7280' }}>Loading…</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/symptom-checker" element={<SymptomCheckerPage />} />
          <Route path="/gallery/:slug" element={<GalleryFeaturePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <WhatsAppFloatingButton
        phoneNumber="918431361112"
        defaultMessage="Hi, I'd like to know more about RxDoctor"
      />
    </>
  );
}

export default App;
