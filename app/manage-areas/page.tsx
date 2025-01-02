"use client";

import React, { useState } from "react";
import AreaList from "../components/ AreaList";
import AreaForm from "../components/AreaForm";

const ManageAreas: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<"form" | "list">("list");

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-8 bg-gray-100 min-h-screen">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-10">
        <h1 className="text-4xl font-semibold mb-8 text-center text-gray-700">Gerenciar Áreas de Atuação</h1>
        <div className="flex justify-around mb-6">
          <button
            onClick={() => setActiveComponent("list")}
            className={`p-4 transition font-semibold text-white rounded w-full mx-2 text-lg ${
              activeComponent === "list"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            Ver Áreas
          </button>
          <button
            onClick={() => setActiveComponent("form")}
            className={`p-4 transition font-semibold text-white rounded w-full mx-2 text-lg ${
              activeComponent === "form"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            Adicionar Área
          </button>
        </div>
        <div className="mt-4">
          {activeComponent === "form" && <AreaForm />}
          {activeComponent === "list" && <AreaList />}
        </div>
      </div>
    </div>
  );
};

export default ManageAreas;