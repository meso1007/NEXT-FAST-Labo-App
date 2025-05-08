import React from "react";
import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface GraphProps {
  voltage: number[];
  temperature: number[];
  flowSpeed: number[];
  newVoltage: number; // 新しい入力された電圧
  newTemperature: number; // 新しい入力された温度
  predictedFlowSpeed: number | null; // 予測されたフロー速度
}

const Graph: React.FC<GraphProps> = ({
  voltage,
  temperature,
  flowSpeed,
  newVoltage,
  newTemperature,
  predictedFlowSpeed,
}) => {
  const data = [
    {
      x: voltage,
      y: temperature,
      z: flowSpeed,
      type: "scatter3d",
      mode: "markers",
      marker: { color: "blue", size: 5 },
      hovertemplate: `
        Voltage: %{x} [V]<br>
        Temperature: %{y} [°C]<br>
        Flow Speed: %{z} [m/s]
    `,
    },
    {
      // 新しい入力された値を追加
      x: [newVoltage],
      y: [newTemperature],
      z: [predictedFlowSpeed], // 予測された流速をzに設定
      type: "scatter3d",
      mode: "markers",
      marker: {
        color: "red", // 新しい値の色を赤に設定
        size: 8,
      },
      hovertemplate: `
        Voltage: %{x} [V]<br>
        Temperature: %{y} [°C]<br>
        Flow Speed: %{z} [m/s]
    `,
    },
  ];

  const layout = {
    margin: { l: 0, r: 0, b: 0, t: 0 },
    scene: {
      xaxis: {
        title: {
          text: "Voltage (V)",
          font: {
            size: 14,
            color: "black",
          },
        },
      },
      yaxis: {
        title: {
          text: "Temperature (°C)",
          font: {
            size: 14,
            color: "black",
          },
        },
      },
      zaxis: {
        title: {
          text: "Flow Speed (m/s)",
          font: {
            size: 14,
            color: "black",
          },
        },
      },
    },
    autosize: true,
    height: 500,
  };

  return <Plot data={data} layout={layout} />;
};

export default Graph;
