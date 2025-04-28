import React from "react";
import Header from "./components/Header";

const MainLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}) => {
  return (
    <>
      <div className="fixed left-0 top-0 z-50 w-full bg-white px-2 shadow-sm md:shadow-none">
        <Header />
      </div>
      <main className="mt-20 pb-8">{children}</main>
    </>
  );
};

export default MainLayout;
