'use client';

import { useEffect, useState } from 'react';

interface HydrationProps {
  children: React.ReactNode;
}

const Hydration: React.FC<HydrationProps> = ({ children }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  return <>{children}</>;
};

export default Hydration;