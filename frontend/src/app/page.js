"use client"
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`flex items-center justify-center min-h-screen ${isLoading ? 'bg-blue-500' : ''}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-blue-500"></div>
      )}
      <Image
        src="/bg-konecta.jpg"
        alt="Background"
        layout="fill"
        objectFit="cover"
        onLoadingComplete={() => setIsLoading(false)}
        className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      />
      <div className="relative z-10 p-8 bg-white rounded-lg shadow-md w-96 bg-gradient-to-r from-white to-transparent">
        <h2 className="text-2xl font-bold mb-6 text-center">Bienvenido</h2>
        <div className="flex flex-col items-center justify-center">
          <Link href="/login" className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 w-full text-center mb-4">
            Iniciar Sesión
          </Link>
          <Link href="/register" className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 w-full text-center">
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  );
}
