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
  console.log("Hello root wrapper");
  
  const { user, isLoading } = useUser();
  const { setUserId, userId, setIsLoading } = useContext(GlobalContext);
  const { refetch: getUserByEmail } = useQuery(GET_USER_BY_EMAIL, {
    skip: true,
  });
  const [createUser] = useMutation(CREATE_USER);

  useEffect(() => {
    setIsLoading(isLoading)
  }, [isLoading])

  useEffect(() => {
    const fetchAndCreateUser = async () => {
      if (user?.email && !isLoading) {
        const { data, loading } = await getUserByEmail({ email: user.email });
        setUserId(data?.getUserByEmail?._id);
        if (!loading && !data?.getUserByEmail) {
          await createUser({
            variables: {
              email: user.email,
              name: user.name,
              email_verified: user.email_verified,
            },
          });
        }
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
