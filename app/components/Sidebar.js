"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathName = usePathname();

  return (
    <div className="sidebar bg-gray-800 text-white h-screen w-64 flex flex-col">
      <div className="p-4 text-lg font-bold">My Restaurant</div>
      <ul className="flex-1 space-y-2 p-4">
        <li>
          <Link href="/">
            <span
              className={`block p-2 rounded transition ${
                pathName === "/" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              Dashboard
            </span>
          </Link>
        </li>
        <li>
          <Link href="/orders">
            <span className={`block p-2 rounded transition ${
                pathName === "/orders" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}>
              All Orders
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
