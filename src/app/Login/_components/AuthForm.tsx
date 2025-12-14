"use client"

import { signIn, useSession } from "next-auth/react";
//import { signIn } from "@/server/auth"; ESSE AQUI NAO ESTAVA FUNCIONANDO Ò.Ó
import type React from "react";
import { useState } from "react";


const AuthForm: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
   
    const handleGoogleSignIn = async () => {
        setIsLoading(true);
       
        try {
            const result = await signIn("google", {
                callbackUrl: "/",
                redirect: true
            });
        } catch (error) {
            alert("Erro ao conectar com Google: " + (error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    //const handleGoogleSignIn = () => {
    //    signIn("google", { callbackUrl: "/dashboard" }); // Adicione uma callbackUrl
    //};
    //const session = useSession();
    return (
        <div className="w-[90vw] max-w-[400px] mx-auto mt-4 px-4 py-6 border border-gray-300 rounded-lg shadow-sm">
            <div>
                <h1 className="mb-6 text-2xl font-normal">Login</h1>
                     
                <form>
                    <div className="mb-4">  
                        <label className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 mb-4" placeholder="Enter your email"/>
                        <label className="block text-sm font-medium mb-1">
                            Password
                        </label>
                        <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" placeholder="Enter your password"/>
                    </div>


                    <button
                        type="button"
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-4 rounded-sm shadow-sm mb-4">
                        Continue
                    </button>


                    {/* Uma linha para fazer a divisão entre logar com senha e logar com o google*/}
                    <hr className="border-gray-300 m-2 p-2"/>


                    {/*<button onClick={() => signIn("google")} className="flex items-center justify-center w-full bg-white border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition-colors duration-200 shadow-sm">*/}
                    <button onClick={handleGoogleSignIn} disabled={isLoading} className={`flex items-center justify-center w-full bg-white border border-gray-300 rounded-lg py-3 px-4 transition-colors duration-200 shadow-sm ${
                            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                        }`}
                    >
                        <img
                            src="https://www.google.com/favicon.ico"
                            alt="Google"
                            className="w-5 h-5 mr-3"
                        />
                        <span className="text-gray-700 font-medium">
                            {isLoading ? 'Conectando...' : 'Sign in with Google'}
                        </span>
                    </button>


                    <a href="/SignUp" className="text-blue-600 underline hover:text-blue-800 hover:no-underline m-1">Sign up</a>
                </form>
            </div>
        </div>
    );
};


export default AuthForm;

