import SectionItem from "./SectionItem";
import { useSession } from "next-auth/react";

export default function AccountPage() {
    const { data: session, status } = useSession();

    if (!session) {
        return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
            <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Unauthorized access</h1>
            <p className="text-gray-600 mb-6">You need to be logged in to access this page.</p>
            <a 
                href="/Login" 
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
                Login
            </a>
            </div>
        </div>
        );
    }

    // Pegas as informações do usuário da sessão para exibir depois
    const userName = session.user?.name || "Usuário";
    const userEmail = session.user?.email || "Não informado";
    const userFirstName = userName.split(' ')[0]; // Primeiro nome

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Your Account</h1>
                <p className="text-gray-600 mt-2">Manage your information, privacy, and security</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna principal */}
            <div className="lg:col-span-2 space-y-6">
                {/* Dados */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-blue-500 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {/* DESENHO DA ENGRENAGEM*/}
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    </div>
                    <h2 className="font-semibold text-xl text-gray-900">Edit Profile</h2>
                </div>
                <ul className="space-y-3">
                    <SectionItem href="#" label="Name" />
                    <SectionItem href="#" label="Email" />
                    <SectionItem href="#" label="Change password" />
                    <SectionItem href="#" label="Your reviews" />
                    <SectionItem href="#" label="Your favorites" />
                </ul>
                </div>
            </div>

            {/* Coluna lateral */}
            <div className="space-y-6">
                
                {/* Ações importantes */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">Important Actions</h3>
                <div className="space-y-3">
                    <button className="w-full flex items-center justify-start p-3 rounded-md border border-red-200 bg-transparent hover:bg-red-50 transition-colors text-red-600">
                    Delete My Account
                    </button>
                </div>
                </div>
            </div>
            </div>

            {/* Informações da conta */}
            <div className="mt-8 bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-lg text-gray-900">Account Information</h3>
                        <p className="text-gray-600 mt-1">
                            Name: {session?.user?.name || "Not available"} </p>
                        <p className="text-gray-600 mt-1">
                            Email: {session?.user?.email || "Not available"} </p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}