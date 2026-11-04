"use client"
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useActionState, useEffect } from 'react';
import { registerAction } from '../_actions/registerAction';
import { toast } from 'sonner';


const RegisterForm = () => {
    const [state,action,isPending] = useActionState(registerAction,null)
    useEffect(()=>{
        if(!state) return;
        if(state?.message){
            if(state.success){
                toast.success(state.message)
            }else {
        toast.error(state.message);
      }
        }
    },[state])
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