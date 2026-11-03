import React from 'react';
import RegisterForm from '../_components/registerForm';
const RegisterPage = () => {
    return (
       <>
    <div className="flex min-h-screen justify-center items-center">
      <div className="w-full max-w-md border rounded-lg p-8 shadow-lg space-y-4">
        {/* generic text */}
        <div className="space-y-2 text-center">
  <h1 className="text-3xl font-bold">Get Started Today!</h1>
  <p className="text-gray-500">Create your account to explore and write blogs</p>
</div>
        {/* form */}
        <RegisterForm></RegisterForm>
      </div>
    </div>
  </>
    );
};

export default RegisterPage;