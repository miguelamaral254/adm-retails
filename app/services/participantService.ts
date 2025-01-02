import api from "../api/api";
import { Participant } from "../interfaces/participantinterface";

const participantService = {
  getParticipantByEmail: async (email: string): Promise<Participant> => {
    try {
      const response = await api.get<Participant>(`participants/email/${email}`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erro ao buscar participante por e-mail:', error.message);
        throw new Error(error.message);
      }

      throw new Error('Erro desconhecido ao buscar participante. Tente novamente.');
    }
  },
};

export default participantService;