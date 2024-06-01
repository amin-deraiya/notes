'use client';
import React, { useContext, useEffect } from 'react';
import PageHeader from './components/PageHeader';
import { useUser } from '@auth0/nextjs-auth0/client';
import { GlobalContext } from './context';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_USER, GET_USER_BY_EMAIL } from './lib/queries';
import Loader from './components/Loader';

export default function RootWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isLoading } = useUser();
  const { setUserId, setIsLoading } = useContext(GlobalContext);
  const { refetch: getUserByEmail, loading } = useQuery(GET_USER_BY_EMAIL, {
    skip: true,
  });
  const [createUser] = useMutation(CREATE_USER);

  useEffect(() => {
    setIsLoading(isLoading || loading);
  }, [isLoading, loading]);

  useEffect(() => {
    const fetchAndCreateUser = async () => {
      setIsLoading(true)
      if (user?.email && !isLoading) {
        const { data, loading } = await getUserByEmail({ email: user.email });
        setUserId(data?.getUserByEmail?._id);
        setIsLoading(loading);
        if (!loading && !data?.getUserByEmail) {
          setIsLoading(true);
          await createUser({
            variables: {
              email: user.email,
              name: user.name,
              email_verified: user.email_verified,
            },
          });
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    };
    fetchAndCreateUser();
  }, [user, isLoading]);

  return (
    <div id="root">
      <Loader />
      <PageHeader />
      {children}
    </div>
  );
}
