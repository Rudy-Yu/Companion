import React from 'react';
import { cn } from '@/lib/utils';
import PlayfulCard from './playful-card';
import PlayfulButton from './playful-button';
import { Users, Heart, Calendar } from 'lucide-react';

/**
 * ServiceCard - Komponen card untuk menampilkan layanan
 * 
 * @param {Object} props - Props komponen
 * @param {string} props.type - Tipe layanan: 'friend', 'lover', 'offline'
 * @param {string} props.title - Judul layanan
 * @param {string} props.description - Deskripsi layanan
 * @param {Function} props.onViewDetails - Handler untuk tombol lihat detail
 * @param {React.HTMLAttributes<HTMLDivElement>} props.rest - Props HTML div lainnya
 * @returns {React.ReactElement}
 */
const ServiceCard = ({ 
  type = 'friend', 
  title, 
  description, 
  onViewDetails, 
  className, 
  ...rest 
}) => {
  // Mapping tipe ke icon dan warna
  const typeConfig = {
    friend: {
      icon: <Users className="h-8 w-8 text-[#6366f1]" />,
      variant: 'primary',
      buttonVariant: 'primary',
    },
    lover: {
      icon: <Heart className="h-8 w-8 text-[#ec4899]" />,
      variant: 'accent',
      buttonVariant: 'accent',
    },
    offline: {
      icon: <Calendar className="h-8 w-8 text-[#8b5cf6]" />,
      variant: 'secondary',
      buttonVariant: 'secondary',
    },
  };

  const config = typeConfig[type] || typeConfig.friend;

  return (
    <PlayfulCard
      variant={config.variant}
      className={cn('flex flex-col items-center p-6 text-center', className)}
      {...rest}
    >
      <div className="mb-4 rounded-full bg-white p-3 shadow-md">
        {config.icon}
      </div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="mb-6 text-sm text-muted-foreground">{description}</p>
      <PlayfulButton 
        variant={config.buttonVariant} 
        onClick={onViewDetails}
        className="mt-auto"
      >
        Lihat Detail
      </PlayfulButton>
    </PlayfulCard>
  );
};

export default ServiceCard;

