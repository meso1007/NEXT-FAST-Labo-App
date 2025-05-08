"use client";
import React, { useState } from "react";
import Header from "@/components/Header/Header";
import Modal from "@/components/Modal";

const InputPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [formData, setFormData] = useState({
    voltage: "",
    temperature: "",
    flow_speed: "",
    date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/add_data_to_csv/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setModalMessage("データを追加しました");
        setIsModalOpen(true);        setFormData({
          voltage: "",
          temperature: "",
          flow_speed: "",
          date: "",
        });
      } else {
        setModalMessage("送信に失敗しました");
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setModalMessage("エラーが発生しました");
      setIsModalOpen(true);    }
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col justify-center items-center">
      <Header title="Add Measurement Data" />
      <Modal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
      />
      
      <h1 className="text-4xl font-semibold">計測データ入力</h1>
      <div className="container mx-auto p-10">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white shadow-lg p-8 rounded-xl max-w-xl mx-auto"
        >
          {["voltage", "temperature", "flow_speed", "date"].map((field) => (
            <div key={field} className="relative">
              <label
                htmlFor={field}
                className="block text-lg font-medium capitalize text-gray-700"
              >
                {field.replace("_", " ")}:
              </label>
              <input
                type={field === "date" ? "date" : "number"}
                name={field}
                id={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                required
                className="w-full border cursor-pointer border-gray-300 rounded-lg p-3 mt-2 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-[var(--main-color)] text-black cursor-pointer py-3 px-6 rounded-lg w-full text-2xl transition-all duration-200 hover:bg-[var(--hover-color)]"
          >
            Add Data
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputPage;
