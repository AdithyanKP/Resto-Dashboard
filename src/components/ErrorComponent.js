"use client";

import React from "react";

const ErrorComponent = ({ error }) => (
  <div className="flex w-full h-full justify-center items-center">
    <p>Error loading component: {error.message}</p>
  </div>
);

export default ErrorComponent;
