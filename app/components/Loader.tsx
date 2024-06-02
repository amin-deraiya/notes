import React, { useContext } from 'react';
import { GlobalContext } from '../context';

const Loader = () => {
  const { isLoading } = useContext(GlobalContext);

  return isLoading ? (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-51 flex items-center justify-center">
      <div className="animate-spin rounded-full border-gray-200 border-4 w-16 h-16 border-t-transparent"></div>
    </div>
  ) : null;
};

export default Loader;
