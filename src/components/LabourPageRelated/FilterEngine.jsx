import { FaFilter, FaFileDownload } from "react-icons/fa";

const FilterEngine = ({selectedDate,setSelectedDate, reportSettings,setReportSettings,generateUniversalReport}) => {
  return (
    <div>
      {/* Advanced Filter List */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-slate-100 space-y-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                  <FaFilter size={14} />
                </div>
                <h2 className="text-xl font-black italic text-slate-900 uppercase">
                  Report Generator
                </h2>
              </div>
      
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {/* 1. Report Type */}
                <div className="flex flex-col gap-2 text-left">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2 italic">
                    Report Type
                  </label>
                  <select
                    value={reportSettings.type}
                    onChange={(e) =>
                      setReportSettings({ ...reportSettings, type: e.target.value })
                    }
                    className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value="daily">Daily</option>
                    <option value="monthly">Monthly</option>
                    <option value="worker-wise">Worker Performance</option>
                  </select>
                </div>
      
                {/* 2. Category Filter */}
                <div className="flex flex-col gap-2 text-left">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2 italic">
                    Category
                  </label>
                  <select
                    value={reportSettings.category}
                    onChange={(e) =>
                      setReportSettings({
                        ...reportSettings,
                        category: e.target.value,
                      })
                    }
                    className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value="all">All Roles</option>
                    <option value="Mistri">Mistri</option>
                    <option value="Majdoor">Majdoor</option>
                    <option value="Electrician">Electricians</option>
                    <option value="Site Supervisor">Site Supervisor</option>
                    <option value="Painter">Painter</option>
                    <option value="Operator">Operator</option>
                    <option value="Putty">Putty</option>
                  </select>
                </div>
      
                {/* 3. Target Month (If Monthly/Worker-wise) */}
                <div className="flex flex-col gap-2 text-left">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2 italic">
                    Select Month
                  </label>
                  <input
                    type="month"
                    value={reportSettings.month}
                    onChange={(e) =>
                      setReportSettings({ ...reportSettings, month: e.target.value })
                    }
                    className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs font-bold outline-none cursor-pointer"
                  />
                </div>
      
                {/* Date Picker */}
                <div className="flex flex-col gap-2 text-left">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2 italic">
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs font-bold outline-none cursor-pointer"
                  />
                </div>
      
                {/* 5. Action Button */}
                <div className="flex items-end">
                  <button
                    onClick={generateUniversalReport}
                    className="w-full h-13 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-500 hover:scale-105 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 cursor-pointer duration-300"
                  >
                    <FaFileDownload /> Get Excel Report
                  </button>
                </div>
              </div>
            </div>
    </div>
  )
}

export default FilterEngine
