"use client"
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useActionState, useEffect } from 'react';
import { registerAction } from '../_actions/registerAction';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


const RegisterForm = () => {
    const [state,action,isPending] = useActionState(registerAction,null)
    const router = useRouter()
    useEffect(()=>{
      if(state && state.success === true){
        toast.success(state.message || "Registration successful!")
        router.push("/login")
      }else if(state && state.success === false){
        toast.error(state.message || "Registration failed!")
      }
    },[state,router])
    return (
          <form  action={action} className='space-y-4'>
        <Card className='p-6 space-y-4'>
            <input type="text" placeholder='your name' name='name' className='border p-2 rounded-xl bg-primary/10'/>
            <input type="email" placeholder='your email' name='email' required  className='border p-2 rounded-xl bg-primary/10'/>
            <input type="password" placeholder='your password' name='password' required className='border p-2 rounded-xl bg-primary/10'/>
            {/* success or error message
            {state?.message &&(
                <p className={`text-sm font-medium ${state.success ? "text-green-600" : "text-red-500"}`}>
                    {state.message}
                </p>
            )} */}
            <Button type='submit' disabled={isPending}>
                {isPending ? "Registering..." : "Register"}
            </Button>
        </Card>
       </form>
    );
};

export default RegisterForm;