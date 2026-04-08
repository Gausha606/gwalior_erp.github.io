import React from "react";

const StatCard = ({ title, value, icon, color, trend, bar }) => {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-between h-64 group hover:-translate-y-1 transition-all duration-300">
      
      {/* Icon & Title Section */}
      <div className="flex justify-between items-start">
        <div className={`p-4 ${color} bg-opacity-10 rounded-2xl text-2xl  text-slate-950 shadow-sm transition-transform group-hover:scale-110`}>
          {icon}
        </div>
        
        {/* Trend Badge (Logic: If trend exists, show it) */}
        {trend && (
          <span className="text-[10px] font-black bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full uppercase tracking-tighter">
            {trend}
          </span>
        )}
      </div>

      {/* Data Section */}
      <div className="mt-4">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
          {title}
        </p>
        <h3 className="text-3xl font-black italic text-slate-800 tracking-tight">
          {value}
        </h3>
      </div>

      {/* Progress Bar (Visual Decor) */}
      {bar>0 && <div className="w-full h-1.5 bg-slate-100 rounded-full mt-4 overflow-hidden">
        <div style={{width:  `${bar}%`}} className={`h-full ${color}  rounded-full opacity-100 animate-pulse`}></div>
      </div>}
      

    </div>
  );
};

export default StatCard;