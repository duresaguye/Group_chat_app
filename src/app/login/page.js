import React, { Suspense } from "react";
import dynamic from 'next/dynamic';
import { FaSpinner } from "react-icons/fa"; // Importing a loading spinner from react-icons

const Login = dynamic(() => import("../../component/Login"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center">
      <FaSpinner className="animate-spin text-4xl" />
      <span className="ml-4">Loading...</span>
    </div>
  ), // Custom loading spinner while the Login component is loading
});

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login />
    </Suspense>
  );
};

export default LoginPage;