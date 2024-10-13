"use client";

import Layout from "./components/Layout";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const Loading = () => (
  <div className="flex w-full h-full justify-center items-center">
    <p>Loading...</p>
  </div>
);

const ErrorComponent = ({ error }) => (
  <div className="flex w-full h-full justify-center items-center">
    <p>Error loading component: {error.message}</p>
  </div>
);

const Dashboard = dynamic(() => import("./components/DashBoard"), {
  loading: Loading,
  ssr: false,
  onError: (error) => <ErrorComponent error={error} />,
});

const Orders = dynamic(() => import("./orders/page"), {
  loading: Loading,
  ssr: false,
  onError: (error) => <ErrorComponent error={error} />,
});

export default function Home() {
  const pathName = usePathname();
  return (
    <div>
      <Layout>
        {pathName === "/" && <Dashboard />}
        {pathName === "/orders" && <Orders />}
      </Layout>
    </div>
  );
}
