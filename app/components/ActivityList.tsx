import React, { useEffect, useState } from 'react';
import activityService from '../services/activityService';
import { Activity } from '../interfaces/activityInterface';

const ActivityList: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await activityService.getAllActivities();
        setActivities(data);
      } catch (error) {
        console.error('Erro ao buscar atividades:', error);
        alert('Erro ao buscar atividades.');
      }
    };

    fetchActivities();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentActivities = activities.slice(startIndex, endIndex);
  const totalPages = Math.ceil(activities.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleEdit = (id: number) => {
    alert(`Editar atividade com ID: ${id}`);
  };

  const handleDelete = async (id: number) => {
    const confirmed = confirm(`Tem certeza que deseja excluir a atividade com ID: ${id}?`);
    if (confirmed) {
      try {
        setActivities((prev) => prev.filter((activity) => activity.idActivity !== id));
        alert('Atividade excluída com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir atividade:', error);
        alert('Erro ao excluir atividade.');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold text-center mb-6 text-black">Lista de Atividades</h2>
      <ul className="space-y-4">
        {currentActivities.map((activity) => (
          <li
            key={activity.idActivity}
            className="border border-gray-300 p-4 rounded shadow bg-white text-black flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold mb-2">{activity.title}</h3>
              <p>{activity.description}</p>
              <p className="mt-2">
                <span className="font-medium">Hora:</span> {activity.time}
              </p>
              <p>
                <span className="font-medium">Data:</span> {new Date(activity.date).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Localização:</span> {activity.location}
              </p>
              <p>
                <span className="font-medium">Palestrantes:</span>{' '}
                {activity.speaker && activity.speaker.length > 0
                  ? activity.speaker.map((spk) => spk.name).join(', ')
                  : 'Nenhum palestrante associado'}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleEdit(activity.idActivity)}
                className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(activity.idActivity)}
                className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition"
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded ${
            currentPage === 1
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Página Anterior
        </button>
        <span className="text-sm text-black">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border rounded ${
            currentPage === totalPages
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Próxima Página
        </button>
      </div>
    </div>
  );
};

export default ActivityList;