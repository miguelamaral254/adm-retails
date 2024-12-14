'use client';

import { useState, useEffect } from 'react';
import participantService from '@/app/services/participantService';
import { Participant } from '../interfaces/participantinterface';

const UserHomePage = () => {
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchParticipant = async () => {
      setLoading(true);
      const email = localStorage.getItem('email');

      if (!email) {
        setError('Usuário não autenticado.');
        setLoading(false);
        return;
      }

      try {
        const data = await participantService.getParticipantByEmail(email);
        setParticipant(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Erro desconhecido ao buscar participante.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchParticipant();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Carregando...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Bem-vindo!</h2>
        <p className="text-lg mb-2">
          <strong>Nome:</strong> {participant?.name}
        </p>
        <p className="text-lg mb-2">
          <strong>E-mail:</strong> {participant?.email}
        </p>
        {participant?.companyName && (
          <p className="text-lg mb-2">
            <strong>Empresa:</strong> {participant?.companyName}
          </p>
        )}
        <p className="text-lg mb-2">
          <strong>Permissão de Postagem:</strong>{' '}
          {participant?.postPermission ? 'Permitido' : 'Não Permitido'}
        </p>
      </div>
    </div>
  );
};

export default UserHomePage;