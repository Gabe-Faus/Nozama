"use client"

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";

const SignUpForm: React.FC = () => {

    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const router = useRouter();

    const registerMutation = api.user.register.useMutation({
        onSuccess: (data) => {
            const message = data.isAdmin 
            ? "ADMIN account created successfully!"
            : "Account created successfully!";
            
            alert(message);
            router.push("/Login");
        },
        onError: (error) => {
            setError(error.message);
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError("");
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters")
            return;
        }

        registerMutation.mutate({
            email: formData.email,
            name: formData.name,
            password: formData.password
        });
    };


    return (
        <div className="w-[90vw] max-w-[400px] mx-auto mt-4 px-4 py-6 border border-gray-300 rounded-lg shadow-sm ">
            <div>
                <h1 className="mb-6 text-2xl font-normal">Create account</h1>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">  
                        {/*EMAIL*/} 
                        <label className="block text-sm font-medium mb-1">
                            Email address
                        </label> 
                        <input type="email" name="email"  value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 mb-4" placeholder="you@example.com" required disabled={registerMutation.isPending}/>

                        {/*NOME*/}
                        <label className="block text-sm font-medium mb-1">
                            Your name
                        </label> 
                        <input type="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 mb-4" placeholder="Full name" required
                        disabled={registerMutation.isPending}/>

                        {/*SENHA*/}
                        <label className="block text-sm font-medium mb-1">
                            Password (At least 6 characters)
                        </label> 
                        <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 mb-4" placeholder="Create your password" required minLength={6} disabled={registerMutation.isPending}/>
                        <label className="block text-sm font-medium mb-1">
                            Re-enter password
                        </label> 
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} 
                        onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" placeholder="Confirm your password" required disabled={registerMutation.isPending}/>
                    </div>

                    <button
                        type="submit"
                        disabled={registerMutation.isPending}
                        className={`w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-4 rounded-sm shadow-sm mb-4 ${
                            registerMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {registerMutation.isPending ? "Creating account..." : "Continue"}
                    </button>

                    {/* Uma linha para fazer a divisão entre logar com senha e logar com o google*/}
                    <hr className="border-gray-300 m-2 p-2"/>
                    <h2>Already have an account?</h2>
                    <a href="/Login" className="text-blue-600 underline hover:text-blue-800 hover:no-underline m-1">Login</a>
                </form>
            </div>
        </div>
    );
};

export default SignUpForm;