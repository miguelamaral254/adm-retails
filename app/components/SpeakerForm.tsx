"use client";

import React, { useState } from "react";
import speakerService from "../services/speakerService";
import useSweetAlert from "../hooks/useSweetAlert";
import { CreateSpeaker } from "../interfaces/createSpeaker";

const SpeakerForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const { showSuccess, showError } = useSweetAlert();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newSpeaker: CreateSpeaker = { name, description, role, company };
      await speakerService.createSpeaker(newSpeaker);
      await showSuccess("Sucesso", "Palestrante adicionado com sucesso!");
      setName("");
      setDescription("");
      setRole("");
      setCompany("");
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
          className="w-full p-2 text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="description" className="block font-semibold text-gray-700 mb-2">
          Descrição do Palestrante
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border text-gray-700 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
      </div>
      <div>
        <label htmlFor="role" className="block font-semibold text-gray-700 mb-2">
          Cargo do Palestrante
        </label>
        <input
          type="text"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          className="w-full text-gray-700 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="company" className="block font-semibold text-gray-700 mb-2">
          Empresa do Palestrante
        </label>
        <input
          type="text"
          id="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
          className="w-full p-2 text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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