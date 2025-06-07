import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone } from 'lucide-react';

/**
 * Footer - Komponen footer website
 * 
 * @returns {React.ReactElement}
 */
const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo dan Deskripsi */}
          <div>
            <Link to="/" className="flex items-center">
              <span className="bg-gradient-to-r from-[#6366f1] to-[#ec4899] bg-clip-text text-2xl font-bold text-transparent">
                Rental Kompanion
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Platform untuk menyewa teman virtual atau offline sesuai kebutuhanmu. 
              Temukan kompanion yang tepat untuk menemani aktivitasmu.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Layanan */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Layanan</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary">
                  Rent a Friend
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary">
                  Rent a Lover
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary">
                  Offline Date
                </Link>
              </li>
            </ul>
          </div>

          {/* Perusahaan */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Perusahaan</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary">
                  Karir
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary">
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary">
                  Kebijakan Privasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Kontak</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@rentalkompanion.com</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+62 812 3456 7890</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Rental Kompanion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

