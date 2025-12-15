"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function TestLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Pega o callbackUrl da query string ou usa /products como padrão
  const callbackUrl = searchParams.get("callbackUrl") || "/products/catalogo";

  const handleTestLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: "teste@teste.com",
        password: "123456",
        redirect: false,
      });

      if (result?.ok) {
        // Redireciona para a URL especificada no callbackUrl
        router.push(callbackUrl);
        router.refresh();
      } else {
        alert("Erro ao fazer login. Verifique as credenciais.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">🚀 Amazonia</h1>
        <p className="text-gray-600 mb-8">Acesse rapidamente para testar</p>
        
        <button
          onClick={handleTestLogin}
          disabled={isLoading}
          className="w-full max-w-xs mx-auto bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 text-lg"
        >
          {isLoading ? (
            <>
              <div className="w-6 h-6 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
              Entrando...
            </>
          ) : (
            <>
              <span>🔓</span>
              Entrar como Usuário Teste
            </>
          )}
        </button>
        
        <div className="mt-6 p-4 bg-white rounded-lg shadow-sm border">
          <p className="text-gray-700">
            <strong>Credenciais de teste:</strong>
          </p>
          <p className="text-gray-600">Email: <code>teste@teste.com</code></p>
          <p className="text-gray-600">Senha: <code>123456</code></p>
          <p className="text-gray-500 text-sm mt-2">
            Após login, você será redirecionado para: <br/>
            <code className="bg-gray-100 px-2 py-1 rounded">{callbackUrl}</code>
          </p>
        </div>
        
        <div className="mt-8">
          <a 
            href="/products" 
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            ← Voltar para produtos
          </a>
        </div>
      </div>
    </div>
  );
}