"use client"

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React, { useActionState, useEffect } from 'react'
import { loginAction } from '../_actions/authactions';
import { toast } from 'sonner';

function LoginForm() {
    const [state,action,pending] = useActionState(loginAction, false);


useEffect(() => {
    if (state?.success) {
        toast.success("Login Successful!", {
            duration: 3000,
            position: "bottom-right",
        });
    }
        if (!state) return;
        toast.error(state.message, {
            duration: 3000,
            position: "bottom-right",
        });

}, [state]);
        

  return (
    
    <form action={action} className='flex flex-col gap-4 w-full'>
        <Card className='w-100 p-5 space-y-4 border-none shadow-none'>
            <Input name="email" placeholder="Enter Your Email" required/>
            <Input name="password" placeholder="Password" type="password" required/>
            <Button type="submit">
               {
pending ? "Logging in..." : "Login"
               }
            </Button>
        </Card>
    </form>
  )
}

export default LoginForm