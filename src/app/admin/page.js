'use client';
import AuthContext from '@/contexts/AuthContext';
import { useContext } from 'react';

export default function AdminPage() {
  const { auth, setAuth } = useContext(AuthContext);
  if (!auth.role === 'admin') {
    return (
      <section className='section'>
        <h1 className='heading'>Admin Page</h1>
        <p className='subtitle'>You are not authorized to view this page.</p>
      </section>
    );
  }
  return (
    <section className='section'>
      <h1 className='heading'>Admin Page</h1>
      <p className='subtitle'>This page is only visible to administrators.</p>
    </section>
  );
}
