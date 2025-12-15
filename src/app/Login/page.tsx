"use client"

import { useSession } from "next-auth/react";
import AuthForm from "./_components/AuthForm";

export default function Login() {
    const session = useSession();
    return (
        <main>
            <p>{session.data?.user.name}</p>
            <AuthForm/>
        </main>
    )
}
