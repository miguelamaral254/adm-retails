"use client";

import React, { useEffect, useState } from "react";
import speakerService from "../services/speakerService";
import useSweetAlert from "../hooks/useSweetAlert";
import { Speaker } from "../interfaces/speakerInterface";

const SpeakerList: React.FC = () => {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const { showAlert, showError, showSuccess, showConfirm } = useSweetAlert();

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const data = await speakerService.getAllSpeakers();
        if (data.length === 0) {
          await showAlert({
            title: "Nenhum Registro",
            text: "Não há palestrantes cadastrados.",
            icon: "info",
            confirmButtonText: "Entendido",
          });
        }
        setSpeakers(data);
      } catch (error) {
        console.error("Erro ao buscar palestrantes:", error);
        await showError("Erro", "Falha ao carregar a lista de palestrantes.");
      }
    };

    fetchSpeakers();
  }, [showAlert, showError]);

  const handleEdit = async (id: number) => {
    const { value: newName } = await showAlert({
      title: "Editar Palestrante",
      text: "Insira o novo nome do palestrante:",
      input: "text",
      inputValue: speakers.find((speaker) => speaker.idSpeaker === id)?.name || "",
      showCancelButton: true,
      confirmButtonText: "Salvar",
    });

    if (newName) {
      try {
        const updatedSpeaker = await speakerService.updateSpeaker(id, { name: newName });
        setSpeakers((prev) =>
          prev.map((speaker) =>
            speaker.idSpeaker === id ? { ...speaker, name: updatedSpeaker.name } : speaker
          )
        );
        await showSuccess("Sucesso", "Palestrante atualizado com sucesso!");
      } catch (error) {
        console.error("Erro ao editar palestrante:", error);
        await showError("Erro", "Falha ao editar o palestrante. Tente novamente.");
      }
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = await showConfirm(
      "Confirmação",
      "Tem certeza que deseja excluir este palestrante?"
    );

    if (confirmed.isConfirmed) {
      try {
        await speakerService.deleteSpeaker(id);
        setSpeakers((prev) => prev.filter((speaker) => speaker.idSpeaker !== id));
        await showSuccess("Sucesso", "Palestrante excluído com sucesso!");
      } catch (error) {
        console.error("Erro ao excluir palestrante:", error);
        await showError("Erro", "Falha ao excluir o palestrante. Tente novamente.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold text-center mb-6 text-black">Lista de Palestrantes</h2>
      {speakers.length === 0 ? (
        <p className="text-center text-gray-500">Ainda não há palestrantes cadastrados.</p>
      ) : (
        <ul className="space-y-4">
          {speakers.map((speaker) => (
            <li
              key={speaker.idSpeaker}
              className="border border-gray-300 p-4 rounded shadow bg-white text-black flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold">{speaker.name}</p>
                <p className="text-sm text-gray-700 mt-1">
                  <span className="font-medium">Descrição:</span> {speaker.description}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <span className="font-medium">Cargo:</span> {speaker.role}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <span className="font-medium">Empresa:</span> {speaker.company}
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => handleEdit(speaker.idSpeaker)}
                  className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(speaker.idSpeaker)}
                  className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SpeakerList;