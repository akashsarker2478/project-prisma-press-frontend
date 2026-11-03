"use client"
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import React from 'react';

const registerForm = () => {
    return (
          <form className='space-y-4'>
        <Card className='p-6 space-y-4'>
            <input type="text" placeholder='your name' name='name' className='border p-2 rounded-xl bg-primary/10'/>
            <input type="email" placeholder='your email' name='email' required  className='border p-2 rounded-xl bg-primary/10'/>
            <input type="password" placeholder='your password' name='password' required className='border p-2 rounded-xl bg-primary/10'/>
            <Button type='submit'>
                Register
            </Button>
        </Card>
       </form>
    );
};

export default registerForm;