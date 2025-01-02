'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaUsers, FaTasks, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  if (!isLoggedIn) {
    return null; 
  }

  return (
    <nav className="bg-blue-600 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">Administrativo Retails</div>
        <div className="flex space-x-4">
          <button
            onClick={() => router.push('/homepage')}
            className="hover:bg-blue-700 px-3 py-2 rounded-md flex items-center gap-2"
          >
            <FaHome /> Página Inicial
          </button>
          <button
            onClick={() => router.push('/manage-users')}
            className="hover:bg-blue-700 px-3 py-2 rounded-md flex items-center gap-2"
          >
            <FaUsers /> Gerenciar Usuários
          </button>
          <button
            onClick={() => router.push('/manage-activities')}
            className="hover:bg-blue-700 px-3 py-2 rounded-md flex items-center gap-2"
          >
            <FaTasks /> Gerenciar Atividades
          </button>
          <button
            onClick={() => router.push('/manage-areas')}
            className="hover:bg-blue-700 px-3 py-2 rounded-md flex items-center gap-2"
          >
            <FaClipboardList /> Gerenciar Áreas de Atuação
          </button>
          <button
            onClick={() => {
              logout();
              router.push('/login');
            }}
            className="hover:bg-blue-700 px-3 py-2 rounded-md flex items-center gap-2"
          >
            <FaSignOutAlt /> Sair
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;