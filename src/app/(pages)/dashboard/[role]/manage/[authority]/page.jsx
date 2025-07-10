'use client';

import React, { useEffect, useState } from 'react';
import AddAuthority from '@/components/addAuthority';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/store';

const superuserApiMap = {
  teacher: '/api/superuser/manage/add-teacher',
  admin: '/api/superuser/manage/add-admin',
  superuser: '/api/superuser/manage/add-superuser',
};

const adminApiMap = {
  teacher: '/api/admin/manage/add-teacher',
};

export default function Page() {
  const { role: loggedInUserRole } = useAuthStore();
  const params = useParams();
  const router = useRouter();

  const roleToAdd = params.authority?.split('-')?.[1]; 
  const [apiEndpoint, setApiEndpoint] = useState(null);
  const { reset } = useForm();

  useEffect(() => {
    if (!loggedInUserRole || !roleToAdd) {
      toast('You are not authorized to add authorities');
    };

    if (loggedInUserRole === 'superuser') {
      superuserApiMap[roleToAdd] ? setApiEndpoint(superuserApiMap[roleToAdd]) : toast('Invalid Route Or Authority to add');
    } else if (loggedInUserRole === 'admin') {
      adminApiMap[roleToAdd] ? setApiEndpoint(adminApiMap[roleToAdd]) : toast('Invalid Route or authority to add');
    } else {
      toast('You are not authorized to add authorities');
    }

  }, [loggedInUserRole, roleToAdd]);

  const onSubmit = async (data) => {
    if (!apiEndpoint) return;

    try {
      const response = await axios.post(apiEndpoint, data);
      if (response.status === 201) {
        toast.success(`${roleToAdd} added successfully`);
        reset();
      } else {
        throw new Error('Failed to add');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || `Failed to add ${roleToAdd}`);
    }
  };

  if (!apiEndpoint) return ;

  return <AddAuthority onSubmit={onSubmit} role={roleToAdd} />;
}
