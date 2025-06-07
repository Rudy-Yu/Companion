import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/layout';
import HomePage from '@/pages/home';
import LoginPage from '@/pages/login';
import RegisterPage from '@/pages/register';
import { ROUTES } from '@/lib/constants';
import './App.css';

function App() {
  // Dummy state untuk simulasi login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route 
          path={ROUTES.HOME} 
          element={
            <Layout isLoggedIn={isLoggedIn} user={user}>
              <HomePage />
            </Layout>
          } 
        />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        {/* Tambahkan rute lain di sini */}
      </Routes>
    </Router>
  );
}

export default App;

