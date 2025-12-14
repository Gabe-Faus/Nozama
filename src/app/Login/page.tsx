"use client"

import { useSession } from "next-auth/react";
import AuthForm from "./_components/AuthForm";

//TENTANDO PEGAR A SESSÃO

export default function Login() {
    const session = useSession();
    return (
        <main>
            <p>{session.data?.user.name}</p>
            <AuthForm/>
        </main>
    )
}
