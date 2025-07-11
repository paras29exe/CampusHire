'use client';

import React, { useEffect, useState } from 'react';
import AddAuthority from '@/components/addAuthority';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { notFound, redirect, useParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/store';
import { PasswordRevealModal } from '@/components/passwordRevealModal';

const superuserApiMap = {
  teacher: '/api/superuser/manage/add-teacher',
  admin: '/api/superuser/manage/add-admin',
  superuser: '/api/superuser/manage/add-superuser',
};

const adminApiMap = {
  teacher: '/api/admin/manage/add-teacher',
};

export default function Page() {
  const { role } = useAuthStore();
  const loggedInUserRole = role
  const params = useParams();
  const router = useRouter();

  const roleToAdd = params.authority?.split('-')?.[1]?.toLowerCase();
  const [apiEndpoint, setApiEndpoint] = useState(null);
  const { reset } = useForm();

  const [modalOpen, setModalOpen] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!loggedInUserRole || !roleToAdd) {
      toast('You are not authorized to add ' + roleToAdd);
      router.replace('/unauthorized');
      return;
    };

    if (loggedInUserRole === 'superuser') {
      superuserApiMap[roleToAdd] ? setApiEndpoint(superuserApiMap[roleToAdd]) : router.replace('/not-found');
    } else if (loggedInUserRole === 'admin') {
      adminApiMap[roleToAdd] ? setApiEndpoint(adminApiMap[roleToAdd]) : router.replace('/not-found');
    } else {
      router.replace('/not-found');
    }

  }, [loggedInUserRole, roleToAdd]);

  const onSubmit = async (data) => {
    if (!apiEndpoint) return;

    try {
      const response = await axios.post(apiEndpoint, data);
      setPassword(response.data.password);
      setModalOpen(true);
      reset();
    } catch (error) {
      console.error('Error adding authority:', error);
      toast.error(error?.response?.data?.message || `Failed to add ${roleToAdd}`);
    }
  };

  if (!apiEndpoint) return;

  return (
    <>
      <AddAuthority onSubmit={onSubmit} role={roleToAdd} />
      <PasswordRevealModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        password={password}
      />
    </>
  )
}
