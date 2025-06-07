import React from 'react';
import { cn } from '@/lib/utils';
import PlayfulCard from './playful-card';
import PlayfulButton from './playful-button';
import { Star } from 'lucide-react';

/**
 * CompanionCard - Komponen card untuk menampilkan kompanion
 * 
 * @param {Object} props - Props komponen
 * @param {string} props.name - Nama kompanion
 * @param {string} props.imageUrl - URL gambar kompanion
 * @param {number} props.rating - Rating kompanion (1-5)
 * @param {string} props.serviceType - Tipe layanan utama: 'friend', 'lover', 'offline'
 * @param {number} props.price - Harga layanan
 * @param {Function} props.onViewProfile - Handler untuk tombol lihat profil
 * @param {React.HTMLAttributes<HTMLDivElement>} props.rest - Props HTML div lainnya
 * @returns {React.ReactElement}
 */
const CompanionCard = ({ 
  name, 
  imageUrl, 
  rating = 5, 
  serviceType = 'friend', 
  price, 
  onViewProfile, 
  className, 
  ...rest 
}) => {
  // Mapping tipe layanan ke label dan warna
  const serviceConfig = {
    friend: {
      label: 'Friend',
      color: 'text-[#6366f1]',
      buttonVariant: 'primary',
    },
    lover: {
      label: 'Lover',
      color: 'text-[#ec4899]',
      buttonVariant: 'accent',
    },
    offline: {
      label: 'Offline',
      color: 'text-[#8b5cf6]',
      buttonVariant: 'secondary',
    },
  };

  const config = serviceConfig[serviceType] || serviceConfig.friend;
  
  // Render stars berdasarkan rating
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          className={cn(
            'h-4 w-4', 
            i <= rating ? 'fill-yellow-400 text-yellow-400' : 'fill-none text-gray-300'
          )} 
        />
      );
    }
    return stars;
  };

  return (
    <PlayfulCard
      className={cn('overflow-hidden', className)}
      {...rest}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={imageUrl || 'https://via.placeholder.com/300x200?text=Kompanion'} 
          alt={name} 
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" 
        />
      </div>
      <div className="p-4">
        <h3 className="mb-1 text-lg font-bold">{name}</h3>
        <div className="mb-2 flex items-center">
          {renderStars()}
        </div>
        <div className="mb-2 flex items-center">
          <span className={cn('text-sm font-medium', config.color)}>
            Layanan: {config.label}
          </span>
        </div>
        <div className="mb-4 text-sm">
          <span className="font-medium">Harga: </span>
          <span className="text-primary">Rp{price?.toLocaleString('id-ID')}/jam</span>
        </div>
        <PlayfulButton 
          variant={config.buttonVariant} 
          onClick={onViewProfile}
          isFullWidth
          size="sm"
        >
          Lihat Profil
        </PlayfulButton>
      </div>
    </PlayfulCard>
  );
};

export default CompanionCard;

