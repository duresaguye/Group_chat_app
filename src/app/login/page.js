import React, { Suspense } from "react";
import Login from "../../component/Login";

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login />
    </Suspense>
  );
};

export default LoginPage;
