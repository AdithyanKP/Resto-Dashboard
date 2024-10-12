import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-grow p-4">{children}</div>
    </div>
  );
};

export default Layout;
