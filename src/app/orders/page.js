"use client";

import React from "react";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import ErrorComponent from "@/components/ErrorComponent";
import dynamic from "next/dynamic";

const Orders = dynamic(() => import("@/components/Orders"), {
  loading: Loading,
  ssr: false,
  onError: (error) => <ErrorComponent error={error} />,
});

const OrdersPage = () => {
  return (
    <Layout>
      <Orders />
    </Layout>
  );
};

export default OrdersPage;
