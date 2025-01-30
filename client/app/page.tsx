'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PrivateRoute from './components/PrivateRoute';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard');
  }, [router]);

  return <PrivateRoute> {null} </PrivateRoute>;
};

export default Page;