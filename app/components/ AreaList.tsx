"use client";

import React, { useEffect, useState } from "react";
import useSweetAlert from "../hooks/useSweetAlert";
import { Area } from "../interfaces/areaInterface";
import areaService from "../services/areaService";

const AreaList: React.FC = () => {
  const [areas, setAreas] = useState<Area[]>([]);
  const { showAlert, showError, showSuccess, showConfirm } = useSweetAlert();

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const data = await areaService.getAllAreas();
        if (data.length === 0) {
          await showAlert({
            title: "Nenhum Registro",
            text: "Não há áreas de atuação cadastradas.",
            icon: "info",
            confirmButtonText: "Entendido",
          });
        }
        setAreas(data);
      } catch (error) {
        console.error("Erro ao buscar áreas:", error);
        await showError("Erro", "Falha ao carregar a lista de áreas.");
      }
    };

    fetchAreas();
  }, [showAlert, showError]);

  const handleEdit = async (id: number) => {
    const { value: newName } = await showAlert({
      title: "Editar Área",
      text: "Insira o novo nome da área:",
      input: "text",
      inputValue: areas.find((area) => area.idArea === id)?.name || "",
      showCancelButton: true,
      confirmButtonText: "Salvar",
    });

    if (newName) {
      try {
        const updatedArea = await areaService.updateArea(id, { name: newName });
        setAreas((prev) =>
          prev.map((area) =>
            area.idArea === id ? { ...area, name: updatedArea.name } : area
          )
        );
        await showSuccess("Sucesso", "Área atualizada com sucesso!");
      } catch (error) {
        console.error("Erro ao editar área:", error);
        await showError("Erro", "Falha ao editar a área. Tente novamente.");
      }
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = await showConfirm(
      "Confirmação",
      "Tem certeza que deseja excluir esta área?"
    );

    if (confirmed.isConfirmed) {
      try {
        await areaService.deleteArea(id);
        setAreas((prev) => prev.filter((area) => area.idArea !== id));
        await showSuccess("Sucesso", "Área excluída com sucesso!");
      } catch (error) {
        console.error("Erro ao excluir área:", error);
        await showError("Erro", "Falha ao excluir a área. Tente novamente.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold text-center mb-6 text-black">Lista de Áreas</h2>
      {areas.length === 0 ? (
        <p className="text-center text-gray-500">Ainda não há áreas cadastradas.</p>
      ) : (
        <ul className="space-y-4">
          {areas.map((area) => (
            <li
              key={area.idArea}
              className="border border-gray-300 p-4 rounded shadow bg-white text-black flex justify-between items-center"
            >
              <p className="text-lg font-semibold">{area.name}</p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleEdit(area.idArea)}
                  className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(area.idArea)}
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

export default AreaList;