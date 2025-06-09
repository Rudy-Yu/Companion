import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Layout from './components/Layout'
import Playground from './pages/Playground'

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={
          isAuthenticated ? <Home /> : <Navigate to="/login" />
        } />
        <Route path="/login" element={
          !isAuthenticated ? <Login /> : <Navigate to="/" />
        } />
        <Route path="/register" element={
          !isAuthenticated ? <Register /> : <Navigate to="/" />
        } />
        <Route path="/profile/*" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/playground" element={
          <ProtectedRoute>
            <Playground />
          </ProtectedRoute>
        } />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  )
}

export default App 