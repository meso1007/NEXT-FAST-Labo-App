import Header from "@/components/Header/Header";
import Image from "next/image";
import React from "react";

const AboutPage = () => {
  return (
    <div className="about-page bg-gray-100">
        <Header title=""/>
      <div className="container mx-auto py-10 px-5">
        {/* タイトル */}
        <h1 className="text-4xl font-bold text-center text-[var(--main-color)] mb-6">
          関本研究室専用 学生向けウェブサイト
        </h1>

        {/* イントロダクション */}
        <section className="intro mb-10">
          <p className="text-2xl text-center text-gray-700">
            このウェブサイトは、関本研究室の学生専用のポータルサイトです。研究活動の最新情報、学習リソース、イベントなどを提供しています。
          </p>
        </section>

        {/* 研究室の紹介 */}
        <section className="lab-introduction mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">研究室の紹介</h2>
          <p className="text-2xl text-gray-700 mb-4">本研究室は[2025/04]に設立されました。</p>
          <p className="text-2xl text-gray-700 mb-4">
            関本研究室では、最新の技術を用いた研究に取り組んでおり、学生には実践的なスキルを身につける機会が与えられています。私たちは、学際的なプロジェクトを通じて学び、成長しています。
          </p>
          <p className="text-2xl text-gray-700">
            研究内容としては、プラズマアクチュエータの研究を中心に活動している。
          </p>
        </section>

        {/* 学生向け情報 */}
        <section className="student-info mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">学生向け情報</h2>
          <ul className="list-disc pl-6 text-xl text-gray-700">
            <li>学習リソース：講義ノート、参考資料、オンラインコースなど</li>
            <li>イベント：研究発表会、勉強会、ネットワーキングイベント</li>
            <li>実習機会：インターンシップ、実験プロジェクト</li>
            <li>サポート体制：メンター制度、カウンセリングサービス</li>
          </ul>
        </section>

        {/* コンパクトなビジュアル（研究室の写真や活動シーン） */}
        <section className="lab-photos mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">研究室の活動</h2>
          <div className="grid grid-cols-3 gap-4">
            <Image src="/images/about-labo1.jpeg" alt="研究室活動" className="w-full h-48 object-cover rounded-lg" width={1000} height={1000}/>
            <Image src="/images/about-labo1.jpeg" alt="学生と先生" className="w-full h-48 object-cover rounded-lg" width={1000} height={1000} />
            <Image src="/images/about-labo1.jpeg" alt="研究発表" className="w-full h-48 object-cover rounded-lg" width={1000} height={1000} />
          </div>
        </section>

        {/* コンタクト情報 */}
        <section className="contact-info mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">お問い合わせ</h2>
          <p className="text-2xl text-gray-700 mb-4">
            研究室に関する質問や、参加希望については以下の連絡先までお問い合わせください。
          </p>
          <p className="text-xl text-gray-700">メール: example@lab.com</p>
          <p className="text-xl text-gray-700">電話: 123-456-7890</p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
