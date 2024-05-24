'use client';
import React, { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';

interface LoginInput {
  email: string;
  pin: number;
}

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $pin: Int!) {
    login(email: $email, pin: $pin) {
      _id
      name
      email
      token
      status
      msg
    }
  }
`;

const LoginPage = () => {
  const [formData, setFormData] = useState<LoginInput>({
    email: 'amin@gmail.com',
    pin: 123,
  });
  const router = useRouter();

  // const [login, { loading, error, data }] = useMutation(LOGIN_MUTATION);
  const [login, { error, data, loading }] = useMutation(LOGIN_MUTATION, {
    variables: { email: formData.email, pin: Number(formData.pin) },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { data } = await login();

    if (data.login.status === 'error') {
      alert(data?.msg);
    } else if (data?.login?.status === 'success') {
      router.push('/home', { scroll: false });
    } else {
      console.log('Login failed:', data?.login);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Login</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Please enter your email and PIN to log in.</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="rounded-md shadow-sm">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email" // Set type to "email" for email validation
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="rounded-md shadow-sm">
              <label htmlFor="pin" className="sr-only">
                PIN
              </label>
              <input
                id="pin"
                name="pin"
                type="number"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="PIN"
                value={formData.pin}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                id="remember-me"
                name="rememberMe"
                type="checkbox"
                className="h-5 w-5 rounded border-gray-300 bg-white focus:ring-indigo-500 focus:ring-offset-white"
              />
              <label htmlFor="remember-me" className="text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
