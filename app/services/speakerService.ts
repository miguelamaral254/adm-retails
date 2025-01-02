import api from "../api/api";
import { CreateSpeaker } from "../interfaces/createSpeaker";
import { Speaker } from "../interfaces/speakerInterface";

const speakerService = {
  getAllSpeakers: async (): Promise<Speaker[]> => {
    try {
      const response = await api.get<Speaker[]>("/speakers");
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erro ao buscar palestrantes:", error.message);
        throw new Error(error.message);
      }
      throw new Error("Erro desconhecido ao buscar palestrantes. Tente novamente.");
    }
  },

  createSpeaker: async (speakerData: CreateSpeaker): Promise<Speaker> => {
    try {
      const response = await api.post<Speaker>("/speakers", speakerData);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erro ao criar palestrante:", error.message);
        throw new Error(error.message);
      }
      throw new Error("Erro desconhecido ao criar palestrante. Tente novamente.");
    }
  },

  updateSpeaker: async (id: number, speakerData: Partial<CreateSpeaker>): Promise<Speaker> => {
    try {
      const response = await api.put<Speaker>(`/speakers/${id}`, speakerData);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erro ao editar palestrante:", error.message);
        throw new Error(error.message);
      }
      throw new Error("Erro desconhecido ao editar palestrante. Tente novamente.");
    }
  },

  deleteSpeaker: async (id: number): Promise<void> => {
    try {
      await api.delete(`/speakers/${id}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erro ao excluir palestrante:", error.message);
        throw new Error(error.message);
      }
      throw new Error("Erro desconhecido ao excluir palestrante. Tente novamente.");
    }
  },
};

export default speakerService;