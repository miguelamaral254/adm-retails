import React, { useState } from 'react';
import activityService from '../services/activityService';

const ActivityForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    time: '',
    date: '',
    location: '',
    speakerId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const activityData = {
        title: formData.title,
        description: formData.description,
        time: formData.time,
        date: formData.date,
        location: formData.location,
        speakerId: [Number(formData.speakerId)],
      };

      console.log('Objeto enviado:', activityData);

      await activityService.createActivity(activityData);
      alert('Atividade criada com sucesso!');
      setFormData({
        title: '',
        description: '',
        time: '',
        date: '',
        location: '',
        speakerId: '',
      });
    } catch (error) {
      console.error('Erro ao criar atividade:', error);
      alert('Erro ao criar atividade.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4 text-center text-black">Criar Nova Atividade</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-black mb-1">Título:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-black mb-1">Descrição:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-black mb-1">Hora:</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-black mb-1">Data:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-black mb-1">Localização:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-black mb-1">ID do Palestrante:</label>
        <input
          type="number"
          name="speakerId"
          value={formData.speakerId}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Criar Atividade
        </button>
      </div>
    </form>
  );
};

export default ActivityForm;