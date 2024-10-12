
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="sidebar bg-gray-800 text-white h-screen w-64 flex flex-col">
      <div className="p-4 text-lg font-bold">My Resturent</div>
      <ul className="flex-1 space-y-2 p-4">
        <li>
          <Link href="/">
            <span className="block p-2 rounded hover:bg-gray-700 transition">
              Dashboard
            </span>
          </Link>
        </li>
        <li>
          <Link href="/orders">
            <span className="block p-2 rounded hover:bg-gray-700 transition">
              All Orders
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
