import Home from '@/app/page';
import { useUser } from '@auth0/nextjs-auth0/client';
import { NextComponentType } from 'next';

function withAuth<T>(Component: NextComponentType) {
  const Auth = (props: any) => {
    const { user, isLoading } = useUser();

    // If user is not logged in, return login component
    if (!user && !isLoading) {
      return <Home />;
    }

    // If user is logged in, return original component
    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
}

export default withAuth;
