import React, { useEffect, useState } from 'react';
import activityService from '../services/activityService';
import speakerService from '../services/speakerService';

const ActivityForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    time: '',
    date: '',
    location: '',
  });
  const [speakers, setSpeakers] = useState<{ idSpeaker: number; name: string }[]>([]);
  const [selectedSpeakers, setSelectedSpeakers] = useState<number[]>([0]);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await speakerService.getAllSpeakers();
        setSpeakers(response);
      } catch (error) {
        console.error('Erro ao buscar palestrantes:', error);
      }
    };
    fetchSpeakers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSpeakerChange = (index: number, value: number) => {
    const updatedSpeakers = [...selectedSpeakers];
    updatedSpeakers[index] = value;
    setSelectedSpeakers(updatedSpeakers);
    if (!updatedSpeakers.includes(0)) {
      setSelectedSpeakers([...updatedSpeakers, 0]);
    }
  };

  const availableSpeakers = (index: number) => {
    return speakers.filter((speaker) => !selectedSpeakers.includes(speaker.idSpeaker) || selectedSpeakers[index] === speaker.idSpeaker);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const activityData = {
        ...formData,
        speakerId: selectedSpeakers.filter((id) => id !== 0),
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
      });
      setSelectedSpeakers([0]);
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
        <label className="block text-sm font-medium text-black mb-1">Palestrantes:</label>
        {selectedSpeakers.map((speakerId, index) => (
          <div key={index} className="mb-2">
            <select
              value={speakerId}
              onChange={(e) => handleSpeakerChange(index, Number(e.target.value))}
              className="form-control"
              required={index === 0}
            >
              <option value={0} disabled>
                Selecione um palestrante
              </option>
              {availableSpeakers(index).map((speaker) => (
                <option key={speaker.idSpeaker} value={speaker.idSpeaker}>
                  {speaker.name}
                </option>
              ))}
            </select>
          </div>
        ))}
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