"use client";

import React, { useState } from "react";
import SpeakerForm from "../components/SpeakerForm";
import SpeakerList from "../components/SpeakerList";

const ManageSpeakers: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<"form" | "list">("list");

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-8 bg-gray-100 min-h-screen">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-10">
        <h1 className="text-4xl font-semibold mb-8 text-center text-gray-700">Gerenciar Palestrantes</h1>
        
        <div className="flex justify-around mb-6">
          <button 
            onClick={() => setActiveComponent("list")} 
            className={`p-4 transition font-semibold text-white rounded w-full mx-2 text-lg ${
              activeComponent === "list" 
                ? "bg-[#4666AF] hover:bg-blue-500" 
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            Ver Palestrantes
          </button>

          <button 
            onClick={() => setActiveComponent("form")} 
            className={`p-4 transition font-semibold text-white rounded w-full mx-2 text-lg ${
              activeComponent === "form" 
                ? "bg-[#4666AF] hover:bg-blue-500" 
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            Adicionar Palestrante
          </button>
        </div>
        
        <div className="mt-4">
          {activeComponent === "form" && <SpeakerForm />}
          {activeComponent === "list" && <SpeakerList />}
        </div>
      </div>
    </div>
  );
};

export default ManageSpeakers;