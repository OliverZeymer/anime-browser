'use client';

import { AuthContext } from '@/providers/AuthContext';
import { useContext } from 'react';

const AdminPage = () => {
  const { auth } = useContext(AuthContext);

  if (!auth) {
    return (
      <section className='section'>
        <h1 className='heading'>Admin Page</h1>
        <p className='subtitle'>You must be logged in to view this page.</p>
      </section>
    );
  }

  return (
    <section className='section'>
      <h1 className='heading'>Admin Page</h1>
      <p className='subtitle'>Welcome, {auth.username}.</p>
    </section>
  );
};

export default AdminPage;
