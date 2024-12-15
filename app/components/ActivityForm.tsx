import React, { useEffect, useState } from 'react';
import activityService from '../services/activityService';
import speakerService from '../services/speakerService';
import areaService from '../services/areaService';
import useSweetAlert from '../hooks/useSweetAlert';

const ActivityForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    time: '',
    date: '',
    location: '',
  });
  const [speakers, setSpeakers] = useState<{ idSpeaker: number; name: string }[]>([]);
  const [areas, setAreas] = useState<{ idArea: number; name: string }[]>([]);
  const [selectedSpeakers, setSelectedSpeakers] = useState<number[]>([0]);
  const [selectedAreas, setSelectedAreas] = useState<number[]>([0]);
  const { showSuccess, showError } = useSweetAlert();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [speakersResponse, areasResponse] = await Promise.all([
          speakerService.getAllSpeakers(),
          areaService.getAllAreas(),
        ]);
        setSpeakers(speakersResponse);
        setAreas(areasResponse);
      } catch (error) {
        showError('Erro', 'Erro ao buscar dados.');
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, [showError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDynamicChange = (index: number, value: number, setSelected: React.Dispatch<React.SetStateAction<number[]>>) => {
    const updated = [...selectedSpeakers];
    updated[index] = value;
    setSelected(updated);
    if (!updated.includes(0)) {
      setSelected([...updated, 0]);
    }
  };

  const availableOptions = (
    index: number,
    selectedItems: number[],
    items: { id: number; name: string }[]
  ) => {
    return items.filter((item) => !selectedItems.includes(item.id) || selectedItems[index] === item.id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const activityData = {
        ...formData,
        speakerId: selectedSpeakers.filter((id) => id !== 0),
        idArea: selectedAreas.filter((id) => id !== 0),
      };

      console.log('Objeto enviado:', activityData);

      await activityService.createActivity(activityData);
      showSuccess('Sucesso', 'Atividade criada com sucesso!');
      setFormData({
        title: '',
        description: '',
        time: '',
        date: '',
        location: '',
      });
      setSelectedSpeakers([0]);
      setSelectedAreas([0]);
    } catch (error) {
      showError('Erro', 'Erro ao criar atividade.');
      console.error('Erro ao criar atividade:', error);
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
              onChange={(e) => handleDynamicChange(index, Number(e.target.value), setSelectedSpeakers)}
              className="form-control"
              required={index === 0}
            >
              <option value={0} disabled>
                Selecione um palestrante
              </option>
              {availableOptions(index, selectedSpeakers, speakers.map(s => ({ id: s.idSpeaker, name: s.name }))).map((speaker) => (
                <option key={speaker.id} value={speaker.id}>
                  {speaker.name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-black mb-1">Áreas de Expertise:</label>
        {selectedAreas.map((areaId, index) => (
          <div key={index} className="mb-2">
            <select
              value={areaId}
              onChange={(e) => handleDynamicChange(index, Number(e.target.value), setSelectedAreas)}
              className="form-control"
              required={index === 0}
            >
              <option value={0} disabled>
                Selecione uma área
              </option>
              {availableOptions(index, selectedAreas, areas.map(a => ({ id: a.idArea, name: a.name }))).map((area) => (
                <option key={area.id} value={area.id}>
                  {area.name}
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