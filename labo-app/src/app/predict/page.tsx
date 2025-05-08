"use client";
import { useState, useEffect, useRef } from "react"; // ← useRef 追加
import { predictFlowSpeed } from "../../utils/api";
import Graph from "../../components/Graph";
import Header from "@/components/Header/Header";

interface GraphData {
  voltage: number[];
  temperature: number[];
  flow_speed: number[];
}

export default function Home() {
  const [data, setData] = useState<GraphData | null>(null);
  const [voltage, setVoltage] = useState<string>("");
  const [temperature, setTemperature] = useState<string>("");
  const [predictedFlowSpeed, setPredictedFlowSpeed] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const previousInputs = useRef({ voltage: "", temperature: "" });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/get_3d_data/");
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // 入力が前回と同じなら API を叩かない
    if (
      previousInputs.current.voltage === voltage &&
      previousInputs.current.temperature === temperature
    ) {
      console.log("同じ入力なので API 呼び出しをスキップ");
      return;
    }
  
    setLoading(true);
    try {
      const predictedSpeed = await predictFlowSpeed(
        Number(voltage),
        Number(temperature)
      );
      setPredictedFlowSpeed(predictedSpeed);
  
      // 入力を記録しておく
      previousInputs.current = { voltage, temperature };
    } catch (error) {
      console.error("Error predicting flow speed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen">
      <h1 className="text-4xl text-center pt-8 semibold">Plasma Actuator Flow Speed Prediction</h1>
      <Header title="Welcome to My Website" />
      <div className="h-full flex items-center justify-center">
        <div className="container mx-auto p-4 flex flex-col md:flex-row">
          {/* 左側: グラフ */}
          <div className="flex-1 mb-4 md:mr-8 border-3 border-[var(--main-color)] p-5 rounded-3xl">
            <h2 className="text-3xl text-center mb-4">
              3D Flow Speed Visualization
            </h2>
            {data ? (
              <Graph
                voltage={data.voltage}
                temperature={data.temperature}
                flowSpeed={data.flow_speed}
                newVoltage={Number(voltage)} // 新しい入力値を渡す
                newTemperature={Number(temperature)} // 新しい入力値を渡す
                predictedFlowSpeed={predictedFlowSpeed} // 予測された流速を渡す
              />
            ) : (
              <p>Loading 3D chart...</p>
            )}
          </div>

          {/* 右側: 入力フォーム */}
          <div className="flex-1 h-full flex flex-col justify-between border-3 border-[var(--main-color)] p-5 rounded-3xl">
            <h1 className="text-3xl text-center mb-4">
              Flow Speed Prediction
            </h1>
            <form
              onSubmit={handleSubmit}
              className="space-y-8 flex-grow flex flex-col justify-between"
            >
              <div>
                <label htmlFor="voltage" className="block text-lg">
                  Voltage (V)
                </label>
                <input
                  type="text"
                  id="voltage"
                  value={voltage}
                  onChange={(e) => setVoltage(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label htmlFor="temperature" className="block text-lg">
                  Temperature (°C)
                </label>
                <input
                  type="text"
                  id="temperature"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[var(--main-color)] text-3xl text-black bold p-2 rounded-xl py-3 cursor-pointer hover:bg-[var(--hover-color)] "
                disabled={loading}
              >
                {loading ? "Loading..." : "Predict"}
              </button>
            </form>

            {predictedFlowSpeed !== null && (
              <div className="mt-4 p-6 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 rounded-3xl shadow-md text-center">
                <h2 className="text-3xl text-white mb-2">
                  Predicted Flow Speed
                </h2>
                <p className="text-4xl text-[var(--main-color)]">
                  {predictedFlowSpeed}{" "}
                  <span className="text-lg text-gray-300">[m/s]</span>
                </p>
                <p className="text-lg text-gray-200 opacity-90 mt-2">
                  Based on the entered voltage and temperature, this is the
                  predicted flow speed.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
