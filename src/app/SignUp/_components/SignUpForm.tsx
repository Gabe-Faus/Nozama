"use client"


import type React from "react";


const SignUpForm: React.FC = () => {
    return (
        <div className="w-[90vw] max-w-[400px] mx-auto mt-4 px-4 py-6 border border-gray-300 rounded-lg shadow-sm">
            <div>
                <h1 className="mb-6 text-2xl font-normal">Create account</h1>
                <form>
                    <div className="mb-4">  
                        {/*EMAIL*/} 
                        <label className="block text-sm font-medium mb-1">
                            Email address
                        </label> 
                        <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 mb-4" placeholder="you@example.com"/>
                        {/*NOME*/}
                        <label className="block text-sm font-medium mb-1">
                            Your name
                        </label> 
                        <input type="name" className="w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 mb-4" placeholder="Full name"/>
                        {/*SENHA*/}
                        <label className="block text-sm font-medium mb-1">
                            Password (At least 6 characters)
                        </label> 
                        <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 mb-4" placeholder="Create your password"/>
                        <label className="block text-sm font-medium mb-1">
                            Re-enter password
                        </label> 
                        <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"/>
                    </div>

                    <button
                        type="button"
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-4 rounded-sm shadow-sm mb-4">
                        Continue
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