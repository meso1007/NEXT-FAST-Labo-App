"use client";
import Header from "@/components/Header/Header";
import React, { useEffect, useState } from "react";
import { FaArrowUpShortWide } from "react-icons/fa6";
import { FaArrowDownShortWide } from "react-icons/fa6";
import Modal from "@/components/Modal"; // Import the Modal component

interface Data {
  voltage: number[];
  temperature: number[];
  flow_speed: number[];
  date: string[];
}

type SortKey = "date" | "voltage" | "temperature" | "flow_speed";
type SortOrder = "asc" | "desc";

const DataTable: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [is_comfirm, setIs_comfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null); // To track which item to delete

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/get_numerical_data/"
        );
        const result: Data = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div className="text-center text-xl font-semibold">Loading...</div>;
  }

  // 配列をオブジェクト配列にマージ
  const mergedData = data.voltage.map((_, index) => ({
    voltage: data.voltage[index],
    temperature: data.temperature[index],
    flow_speed: data.flow_speed[index],
    date: data.date[index],
  }));

  // ソート処理
  const sortedData = [...mergedData].sort((a, b) => {
    let valA: number | string = a[sortKey];
    let valB: number | string = b[sortKey];

    if (sortKey === "date") {
      valA = new Date(valA).getTime();
      valB = new Date(valB).getTime();
    }

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // ヘッダーのクラスを条件で変更
  const getHeaderClass = (key: SortKey) => {
    return `py-5 px-5 text-center font-medium cursor-pointer ${
      sortKey === key
        ? "bg-[var(--main-color)] text-white"
        : "bg-gray-300 text-black"
    }`;
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      // すでに選ばれているキーなら昇順・降順を切り替え
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      // 新しいキーが選ばれた場合は昇順にセット
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // ソートアイコン
  const getArrow = (key: SortKey) => {
    if (sortKey !== key) return "";
    return sortOrder === "asc" ? (
      <FaArrowUpShortWide />
    ) : (
      <FaArrowDownShortWide />
    );
  };

  const handleDelete = async (date: string) => {
    setModalMessage(`データ（${date}）を本当に削除しますか？`);
    setIs_comfirm(true);
    setItemToDelete(date); // Set the date of the item to delete
    setIsModalOpen(true); // Open the modal
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      const response = await fetch(
        `http://localhost:8000/delete_data/?date=${itemToDelete}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        // ローカルデータ更新
        const newData = {
          ...data,
          date: data.date.filter((d) => d !== itemToDelete),
          voltage: data.voltage.filter((_, i) => data.date[i] !== itemToDelete),
          temperature: data.temperature.filter(
            (_, i) => data.date[i] !== itemToDelete
          ),
          flow_speed: data.flow_speed.filter(
            (_, i) => data.date[i] !== itemToDelete
          ),
        };
        setData(newData);

        // 完了メッセージを設定し、モーダルを表示
        setIs_comfirm(false);
        setModalMessage(`データが削除されました！`);
        setIsModalOpen(true);

        // 少し待ってからモーダルを閉じる
        setTimeout(() => {
          setIsModalOpen(false);
        }, 2000); // 2秒後にモーダルを閉じる
      } else {
        setModalMessage(`削除に失敗しました`);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("エラー:", error);
      setModalMessage(`削除に失敗しました`);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="bg-gray-100">
      <Header title="" />
      <div className="container mx-auto p-10">
        <h1 className="text-3xl font-bold text-center mb-20">
          プラズマアクチュエータ計測データ
        </h1>
        <div className="overflow-x-auto shadow-xl rounded-xl">
          <table className="min-w-full table-auto text-sm bg-white">
            <thead className="bg-gray-300 text-gray-100 text-xl">
              <tr>
                <th
                  className={getHeaderClass("date")}
                  onClick={() => handleSort("date")}
                >
                  <div className="flex items-center justify-center gap-1">
                    <p>Date</p> <span> {getArrow("date")}</span>
                  </div>
                </th>
                <th
                  className={getHeaderClass("voltage")}
                  onClick={() => handleSort("voltage")}
                >
                  <div className="flex items-center justify-center gap-1">
                    <p>Voltage (V)</p> <span> {getArrow("voltage")}</span>
                  </div>
                </th>
                <th
                  className={getHeaderClass("temperature")}
                  onClick={() => handleSort("temperature")}
                >
                  <div className="flex items-center justify-center gap-1">
                    <p>Temperature (°C)</p>
                    <span> {getArrow("temperature")}</span>
                  </div>
                </th>

                <th
                  className={getHeaderClass("flow_speed")}
                  onClick={() => handleSort("flow_speed")}
                >
                  <div className="flex items-center justify-center gap-1">
                    <p>Flow Speed (m/s)</p>
                    <span> {getArrow("flow_speed")}</span>
                  </div>
                </th>
                <th className="py-5 px-5 text-center font-medium bg-gray-300 text-black">
                  <p>Button</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item, index) => (
                <tr key={index} className="border-b text-2xl hover:bg-gray-50">
                  <td className="py-5 px-5 text-center">{item.date}</td>
                  <td className="py-5 px-5 text-center">
                    {item.voltage.toFixed(2)}
                  </td>
                  <td className="py-5 px-5 text-center">
                    {item.temperature.toFixed(2)}
                  </td>
                  <td className="py-5 px-5 text-center">
                    {item.flow_speed.toFixed(2)}
                  </td>
                  <td className="py-5 px-5 text-center">
                    <button
                      onClick={() => handleDelete(item.date)}
                      className="bg-red-400 cursor-pointer hover:bg-red-600 text-white py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for confirmation */}
      {is_comfirm ? (
        <Modal
          isOpen={isModalOpen}
          message={modalMessage}
          onClose={() => setIsModalOpen(false)}
          onComplete={confirmDelete} // Confirm delete action
        />
      ) : (
        <Modal
          isOpen={isModalOpen}
          message={modalMessage}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default DataTable;
