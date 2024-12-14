"use client";

import React, { useState } from "react";
import speakerService from "../services/speakerService";
import useSweetAlert from "../hooks/useSweetAlert";
import { CreateSpeaker } from "../interfaces/createSpeaker";

const SpeakerForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const { showSuccess, showError } = useSweetAlert();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newSpeaker: CreateSpeaker = { name };
      await speakerService.createSpeaker(newSpeaker);
      await showSuccess("Sucesso", "Palestrante adicionado com sucesso!");
      setName("");
    } catch (error) {
      console.error("Erro ao adicionar palestrante:", error);
      await showError("Erro", "Falha ao adicionar o palestrante. Tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block font-semibold text-gray-700 mb-2">
          Nome do Palestrante
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
        className="w-full p-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
      >
        Adicionar Palestrante
      </button>
    </form>
  );
};

export default SpeakerForm;