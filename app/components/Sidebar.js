// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// const Sidebar = () => {
//   const pathName = usePathname();

//   return (
//     <div className="sidebar bg-gray-800 text-white h-screen w-64 flex flex-col">
//       <div className="p-4 text-lg font-bold">My Restaurant</div>
//       <ul className="flex-1 space-y-2 p-4">
//         <li>
//           <Link href="/">
//             <span
//               className={`block p-2 rounded transition ${
//                 pathName === "/" ? "bg-gray-700" : "hover:bg-gray-700"
//               }`}
//             >
//               Dashboard
//             </span>
//           </Link>
//         </li>
//         <li>
//           <Link href="/orders">
//             <span className={`block p-2 rounded transition ${
//                 pathName === "/orders" ? "bg-gray-700" : "hover:bg-gray-700"
//               }`}>
//               All Orders
//             </span>
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;


"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars } from "react-icons/fa"; // Importing the hamburger icon

const Sidebar = () => {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Hamburger Menu for mobile screens */}
      <div className="sm:hidden p-4">
        <button
          onClick={toggleSidebar}
          className="text-black focus:outline-none"
        >
          <FaBars size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white h-screen w-64 fixed sm:relative top-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
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
              <span
                className={`block p-2 rounded transition ${
                  pathName === "/orders" ? "bg-gray-700" : "hover:bg-gray-700"
                }`}
              >
                All Orders
              </span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay to close the sidebar when open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 sm:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Sidebar;

