import api from "../api/api";
import { Activity } from "../interfaces/activityInterface";
import { CreateActivity } from "../interfaces/createActivityInterface";

const activityService = {
  getAllActivities: async (): Promise<Activity[]> => {
    try {
      const response = await api.get<Activity[]>('/activities');
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erro ao buscar atividades:', error.message);
        throw new Error(error.message);
      }
      throw new Error('Erro desconhecido ao buscar atividades. Tente novamente.');
    }
  },

  createActivity: async (activityData: CreateActivity): Promise<Activity> => {
    try {
      const formattedData = {
        ...activityData,
        speakerId: activityData.speakerId?.map(Number) ?? [], // Tratar caso `speakerId` seja undefined
      };

      const response = await api.post<Activity>('/activities', formattedData);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erro ao criar atividade:', error.message);
        throw new Error(error.message);
      }
      throw new Error('Erro desconhecido ao criar atividade. Tente novamente.');
    }
  },
};

export default activityService;