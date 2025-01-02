import api from "../api/api";
import { Area } from "../interfaces/areaInterface";
import { CreateArea } from "../interfaces/createAreaInterface";

const areaService = {
  getAllAreas: async (): Promise<Area[]> => {
    try {
      const response = await api.get<Area[]>("/areas");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar áreas:", error);
      throw new Error("Erro ao buscar áreas.");
    }
  },

  createArea: async (areaData: CreateArea): Promise<Area> => {
    try {
      const response = await api.post<Area>("/areas", areaData);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar área:", error);
      throw new Error("Erro ao criar área.");
    }
  },

  updateArea: async (id: number, areaData: Partial<CreateArea>): Promise<Area> => {
    try {
      const response = await api.put<Area>(`/areas/${id}`, areaData);
      return response.data;
    } catch (error) {
      console.error("Erro ao editar área:", error);
      throw new Error("Erro ao editar área.");
    }
  },

  deleteArea: async (id: number): Promise<void> => {
    try {
      await api.delete(`/areas/${id}`);
    } catch (error) {
      console.error("Erro ao excluir área:", error);
      throw new Error("Erro ao excluir área.");
    }
  },
};

export default areaService;