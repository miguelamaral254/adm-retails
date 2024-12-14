import api from "../api/api";
import { CreateSpeaker } from "../interfaces/createSpeaker";
import { Speaker } from "../interfaces/speakerInterface";

const speakerService = {
  getAllSpeakers: async (): Promise<Speaker[]> => {
    try {
      const response = await api.get<Speaker[]>('/speakers');
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erro ao buscar palestrantes:', error.message);
        throw new Error(error.message);
      }
      throw new Error('Erro desconhecido ao buscar palestrantes. Tente novamente.');
    }
  },

  createSpeaker: async (speakerData: CreateSpeaker): Promise<Speaker> => {
    try {
      const response = await api.post<Speaker>('/speakers', speakerData);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erro ao criar palestrante:', error.message);
        throw new Error(error.message);
      }
      throw new Error('Erro desconhecido ao criar palestrante. Tente novamente.');
    }
  },
};

export default speakerService;