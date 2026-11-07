"use client"
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { loginAction } from '../_actions/loginAction';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const router = useRouter()
    const [state,action,isPending] = useActionState(loginAction,null)
    useEffect(()=>{
      if (state?.success === false) {
      toast.error(state.message || "Login failed!");
    }

    if (state?.success === true) {
      toast.success("Login successful!");
      router.refresh();  
      router.push("/dashboard");
    }
    },[state,router])
    return (
       <form action={action} className='space-y-4'>
        <Card className='p-6 space-y-4'>
            <input type="email" placeholder='your email' name='email' required  className='border p-2 rounded-xl bg-primary/10'/>
            <input type="password" placeholder='your password' name='password' required className='border p-2 rounded-xl bg-primary/10'/>

            {/* button */}
            <Button type='submit' disabled={isPending}>
                {isPending? "Logging in...": "Login"}
            </Button>
        </Card>
       </form>
    );
};

export default LoginForm;