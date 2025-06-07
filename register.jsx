import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PlayfulButton from '@/components/ui/custom/playful-button';
import PlayfulCard from '@/components/ui/custom/playful-card';
import { ROUTES } from '@/lib/constants';

/**
 * RegisterPage - Halaman pendaftaran
 * 
 * @returns {React.ReactElement}
 */
const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState('user'); // 'user' atau 'companion'
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm({
      ...registerForm,
      [name]: value,
    });
  };

  const handleCheckboxChange = (checked) => {
    setRegisterForm({
      ...registerForm,
      agreeTerms: checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register form submitted:', { ...registerForm, userType });
    // TODO: Implement register logic
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
              Buat akun untuk mengakses layanan Rental Kompanion
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex">
            <Link
              to={ROUTES.LOGIN}
              className="flex-1 border-b-2 border-transparent pb-2 text-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Masuk
            </Link>
            <button
              className="flex-1 border-b-2 border-primary pb-2 text-center text-sm font-medium text-primary"
            >
              Daftar
            </button>
          </div>

          {/* User Type Tabs */}
          <Tabs defaultValue="user" className="mb-6" onValueChange={setUserType}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="user">Daftar sebagai Pengguna</TabsTrigger>
              <TabsTrigger value="companion">Daftar sebagai Kompanion</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Register Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="name" className="mb-1 block text-sm font-medium">
                Nama Lengkap
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nama lengkap Anda"
                  className="pl-10"
                  value={registerForm.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

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
                  value={registerForm.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <Label htmlFor="phone" className="mb-1 block text-sm font-medium">
                Nomor Telepon
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="08123456789"
                  className="pl-10"
                  value={registerForm.phone}
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
                  value={registerForm.password}
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

            <div className="mb-6">
              <Label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium">
                Konfirmasi Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  value={registerForm.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="mb-6 flex items-center space-x-2">
              <Checkbox
                id="agreeTerms"
                checked={registerForm.agreeTerms}
                onCheckedChange={handleCheckboxChange}
                required
              />
              <Label
                htmlFor="agreeTerms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Saya setuju dengan{' '}
                <Link to="#" className="text-primary hover:underline">
                  Syarat & Ketentuan
                </Link>
              </Label>
            </div>

            <PlayfulButton
              type="submit"
              variant="primary"
              isFullWidth
              className="mb-6"
              disabled={!registerForm.agreeTerms}
            >
              Daftar
            </PlayfulButton>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-2 text-muted-foreground">
                  Atau daftar dengan
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
            <span className="text-muted-foreground">Sudah punya akun? </span>
            <Link to={ROUTES.LOGIN} className="font-medium text-primary hover:underline">
              Masuk
            </Link>
          </div>
        </PlayfulCard>
      </div>
    </div>
  );
};

export default RegisterPage;

