import api from "../api/api";
import { LoginResponse } from "../interfaces/loginResponseInterface";

const authService = {
  login: async (email: string): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>('/auth/login', { email });
      const { token } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('email', email);

      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error && error.message) {
        throw new Error(error.message);
      }

      throw new Error('Erro desconhecido ao realizar login.');
    }
  },
};

export default authService;