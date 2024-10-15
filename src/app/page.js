"use client";

import Layout from "@/components/Layout";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading";
import ErrorComponent from "@/components/ErrorComponent";

const Dashboard = dynamic(() => import("@/components/DashBoard"), {
  loading: Loading,
  ssr: false,
  onError: (error) => <ErrorComponent error={error} />,
});

export default function Home() {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
}
