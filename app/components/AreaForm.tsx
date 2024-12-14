"use client";

import React, { useState } from "react";
import useSweetAlert from "../hooks/useSweetAlert";
import { CreateArea } from "../interfaces/createAreaInterface";
import areaService from "../services/areaService";

const AreaForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const { showSuccess, showError } = useSweetAlert();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newArea: CreateArea = { name };
      await areaService.createArea(newArea);
      await showSuccess("Sucesso", "Área de atuação adicionada com sucesso!");
      setName("");
    } catch (error) {
      console.error("Erro ao adicionar área de atuação:", error);
      await showError("Erro", "Falha ao adicionar a área. Tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block font-semibold text-gray-700 mb-2">
          Nome da Área
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full p-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
      >
        Adicionar Área
      </button>
    </form>
  );
};

export default AreaForm;