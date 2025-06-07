import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import PlayfulButton from '@/components/ui/custom/playful-button';
import PlayfulCard from '@/components/ui/custom/playful-card';
import { ROUTES } from '@/lib/constants';

/**
 * LoginPage - Halaman login
 * 
 * @returns {React.ReactElement}
 */
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('login'); // 'login' atau 'register'
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const handleCheckboxChange = (checked) => {
    setLoginForm({
      ...loginForm,
      rememberMe: checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login form submitted:', loginForm);
    // TODO: Implement login logic
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-md">
        {/* Back Button */}
        <Link to={ROUTES.HOME} className="mb-6 flex items-center text-sm font-medium text-muted-foreground hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Beranda
        </Link>

        <PlayfulCard className="p-8">
          <div className="mb-6 text-center">
            <h1 className="mb-2 text-2xl font-bold">Daftar / Masuk</h1>
            <p className="text-sm text-muted-foreground">
              Masuk ke akun Anda untuk mengakses layanan Rental Kompanion
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex">
            <button
              className={`flex-1 border-b-2 pb-2 text-center text-sm font-medium ${
                activeTab === 'login'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('login')}
            >
              Masuk
            </button>
            <Link
              to={ROUTES.REGISTER}
              className="flex-1 border-b-2 border-transparent pb-2 text-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Daftar
            </Link>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="email" className="mb-1 block text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nama@email.com"
                  className="pl-10"
                  value={loginForm.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <Label htmlFor="password" className="mb-1 block text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  value={loginForm.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={loginForm.rememberMe}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label
                  htmlFor="rememberMe"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Ingat saya
                </Label>
              </div>
              <Link
                to="#"
                className="text-sm font-medium text-primary hover:underline"
              >
                Lupa password?
              </Link>
            </div>

            <PlayfulButton
              type="submit"
              variant="primary"
              isFullWidth
              className="mb-6"
            >
              Masuk
            </PlayfulButton>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-2 text-muted-foreground">
                  Atau masuk dengan
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                className="flex items-center justify-center rounded-md border border-border bg-background px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="mr-2 h-4 w-4"
                />
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center rounded-md border border-border bg-background px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                <img
                  src="https://www.svgrepo.com/show/448224/facebook.svg"
                  alt="Facebook"
                  className="mr-2 h-4 w-4"
                />
                Facebook
              </button>
              <button
                type="button"
                className="flex items-center justify-center rounded-md border border-border bg-background px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                <img
                  src="https://www.svgrepo.com/show/473531/apple.svg"
                  alt="Apple"
                  className="mr-2 h-4 w-4"
                />
                Apple
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Belum punya akun? </span>
            <Link to={ROUTES.REGISTER} className="font-medium text-primary hover:underline">
              Daftar
            </Link>
          </div>
        </PlayfulCard>
      </div>
    </div>
  );
};

export default LoginPage;

