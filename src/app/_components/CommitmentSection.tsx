"use client";

{/* CommitmentSection-react Marina Pimentel - 222014071 */}

{/* É necessario o uso da biblioteca lucide-react, para isso use o seguinte comando:  */}
{/* pnpm install lucide-react */}

import React from 'react';
import { HeartHandshake, CheckCircle2 } from 'lucide-react'; 

const CommitmentSection: React.FC = () => {
  return (
    <section className="py-20 bg-bodyamazon">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        
        {/* Ícone coração */}
        <HeartHandshake className="text-gray-800 w-12 h-12 mx-auto mb-4" /> 
        
        {/* Título */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Our Commitment: Transparency First
        </h2>
        
        {/* Mensagem */}
        <p className="text-xl text-gray-700 mb-6">
          "At Nozama, our mission is simple: to make sure you never regret a purchase again. We promise unbiased, community-driven reviews and guides, always putting the buyer's truth before profit."
        </p>
        
        {/* 3 checks */}
        <div className="flex justify-center space-x-8 mt-8">
      
            <div className="text-md font-semibold text-gray-700 flex items-center">
                <CheckCircle2 className="w-4 h-4 text-blue-900 mr-2" /> 
                No Sponsored Content
            </div>
            
            <div className="text-md font-semibold text-gray-700 flex items-center">
                <CheckCircle2 className="w-4 h-4 text-blue-900 mr-2" />
                Buyer-Centric Ratings
            </div>
            
            <div className="text-md font-semibold text-gray-700 flex items-center">
                <CheckCircle2 className="w-4 h-4 text-blue-900 mr-2" />
                Active Moderation
            </div>
            
        </div>
      </div>
    </section>
  );
};

export default CommitmentSection;