"use client";
import Header from "@/components/Header/Header";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-gray-700 via-[var(--main-color)] to-gray-400">
      <Header title="" />
  
      {/* 左側：写真とその周りの説明 */}
      <div className="flex-1 flex flex-col items-center justify-center rounded-2xl"> {/* ここに p-6 を追加して隙間を作る */}
        <div className="w-full h-full flex justify-center items-center rounded-2xl">
          <Image
            src="/images/labo.jpeg"
            alt="Labo Image"
            width={1000} // 幅を指定
            height={1000} // 高さを指定
            className="object-cover max-h-screen rounded-2xl"
          />
        </div>
      </div>
  
      {/* 右側：コンテンツ */}
      <div className="flex-1 p-6 flex flex-col justify-center text-center md:text-left">
        <h1 className="text-5xl text-white font-bold mb-6 leading-relaxed">
          関本研究室専用 <br /> 学生向けウェブサイト{" "}
        </h1>
        <p className="text-2xl text-white mb-8">
          このページは、関本研究室の学生のために作られたものです。
          <br />
          ここでは、プラズマアクチュエータ流速予測ツールや、研究室データ管理ができるサイトとなっています。
        </p>
  
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 justify-center md:justify-start">
          <Link href="/predict">
            <div className="px-6 py-3 bg-[#54433b] text-xl text-white rounded-xl shadow-lg hover:bg-[#3A2F2A] transition duration-300 w-full md:w-auto">
              流速の推測へ
            </div>
          </Link>
          <Link href="/about">
            <div className="px-6 py-3 bg-[#dfe0df] text-xl text-black rounded-xl shadow-lg hover:bg-[#CECFCE] transition duration-300 w-full md:w-auto">
              詳細について
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
