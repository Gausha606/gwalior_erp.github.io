import React, { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineInventory } from "react-icons/md";
import { FaPeopleCarry } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";

const menu = [
  { id: "dashboard", label: "Dashboard", icon: <LuLayoutDashboard /> },
  { id: "inventory", label: "Inventory", icon: <MdOutlineInventory /> },
  { id: "labour", label: "Labour", icon: <FaPeopleCarry /> },
  { id: "expense", label: "Expense", icon: <FaMoneyCheckDollar /> },
];

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      
      <div className="h-screen fixed top-0 left-0 bg-slate-900 hidden md:block w-56 z-20 shadow-2xl transition-all duration-300">
        <div className="flex items-center p-6 mb-4 border-b border-slate-800">
          <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black italic shadow-lg mr-3">
            G
          </div>
          <h2 className="text-xl text-white font-black italic tracking-tighter uppercase">
            Gwalior <span className="text-indigo-500 text-xs">ERP</span>
          </h2>
        </div>

        <nav className="px-2 space-y-2">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] pl-4 mb-4">
            Menu
          </p>

          {menu.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full p-4 rounded-2xl flex items-center font-bold transition-all duration-200 group cursor-pointer ${
                activeTab === item.id
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/20"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              <span
                className={`mr-4 text-xl transition-transform group-hover:scale-110 ${activeTab === item.id ? "text-white" : "text-slate-500"}`}
              >
                {item.icon}
              </span>
              <span className="text-sm uppercase tracking-tight">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-8 left-0 w-full px-8">
          <div className="p-4 bg-slate-800/50 rounded-3xl border border-slate-700/50">
            <p className="text-[9px] font-black text-indigo-400 uppercase">
              Site: A-1 Gwalior
            </p>
            <p className="text-[8px] text-slate-500 font-bold uppercase mt-1">
              v1.0 Milestone
            </p>
          </div>
        </div>
      </div>


      {/* mobile menu */} 
      <div className="w-full sm:hidden top-0 left-0 p-4 fixed bg-indigo-500 flex flex-col justify-center items-center z-20 mb-20 transition-all duration-300">
        <FaChevronDown
          size={20}
          onClick={() => setIsOpen(!isOpen)}
          className={`text-white animate-pulse ${isOpen ? "rotate-180" : "rotate-0"}`}
        />

        <div className={`${isOpen ? "flex flex-col gap-6 mt-4 opacity-100" : "opacity-0"} transition-all duration-500 `}>
          {menu.map((item) => (
          <button
            key={item.id}
            className={`text-white text-xl flex items-center ${isOpen ? "block  opacity-100" : "hidden opacity-0"} transition-all duration-300`}
            onClick={() => {
              setActiveTab(item.id)
              setIsOpen(false)
            }}
          >
            <span
              className={`mr-4 text-xl transition-transform group-hover:scale-110 text-white `}
            >
              {item.icon}
            </span>
            <span className="text-sm uppercase tracking-tight">
              {item.label}
            </span>
          </button>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
