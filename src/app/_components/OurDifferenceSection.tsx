"use client"; 

{/* OurDifference-react Marina Pimentel - 222014071 */}

{/* É necessario o uso da biblioteca lucide-react, para isso use o seguinte comando:  */}
{/* pnpm install lucide-react */}

import React from 'react';
import { CheckCircle, Users, DollarSign } from 'lucide-react';

{/* Lista de benefícios */}
const benefits = [
  {
    icon: <CheckCircle className="text-gray-800 w-8 h-8 mx-auto" />, 
    title: 'Verified & Honest Reviews',
    description: 'Our proprietary algorithm filters out sponsored content, ensuring every review is based on genuine user experience and credibility.'
  },
  {
    icon: <Users className="text-gray-800 w-8 h-8 mx-auto" />,
    title: 'Community of Experts',
    description: 'Join a large network of verified users who share detailed guides and tips on how to use and maintain products effectively.'
  },
  {
    icon: <DollarSign className="text-gray-800 w-8 h-8 mx-auto" />,
    title: 'Save Money, Buy Smarter',
    description: 'Stop wasting money on disappointing purchases. Our rating system lets you quickly identify the best value item in the Amazon catalog.'
  },
];

const OurDifferenceSection: React.FC = () => {
  return (
    <section className="py-20 bg-bodyamazon">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Título */}
        <h2 className="text-gray-900 font-amazon font-extrabold text-4xl mb-12 text-center">
          Our Difference
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          We are committed to empowering your purchasing decisions with transparency and knowledge.
        </p>

        {/* Cards de Benefícios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-gray-50 p-6 rounded-xl shadow-md transition-shadow hover:shadow-lg text-center"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurDifferenceSection;