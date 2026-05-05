import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import PaymentPage from './Payment.tsx';
import ReservationPage from './reservation.tsx';
import './index.css';

function Root() {
  const path = window.location.pathname;

  if (path === '/payment' || path === '/payment/') {
    return <PaymentPage />;
  }

  if (path === '/reservation' || path === '/reservation/') {
    return <ReservationPage />;
  }

  return <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);