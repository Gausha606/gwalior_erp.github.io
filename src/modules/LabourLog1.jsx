import React, { useState } from "react";
import {FaFilter, FaCalendarAlt, FaFileDownload, FaUmbrellaBeach } from "react-icons/fa";
import * as XLSX from "xlsx";

const LabourLog = ({ labourList, attendanceData, setAttendanceData }) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const holidays = ["2026-04-05", "2026-04-12", "2026-04-19", "2026-04-26"];
  const isHoliday = holidays.includes(selectedDate);

  const [reportSettings, setReportSettings] = useState({
    type: "daily",     // daily, monthly, worker-wise
    category: "all",   // all, mistri, helper
    workerId: "all",   // specific worker id
    month: new Date().toISOString().slice(0, 7), // YYYY-MM (e.g., 2026-04)
  });

  console.log(reportSettings)

  const toggleAttendence = (ID) => {
    if (isHoliday) return;

    setAttendanceData((prev) => {
      const dayRecord = prev[selectedDate] || [];
      const workerRecord = dayRecord.find((i) => i.id === ID);

      if (workerRecord) {
        return {
          ...prev,
          [selectedDate]: dayRecord.map((item) =>
            item.id === ID ? { ...item, isPresent: !item.isPresent } : item,
          ),
        };
      } else {
        return {
          ...prev,
          [selectedDate]: [...dayRecord, { id: ID, isPresent: true }],
        };
      }
    });
  };

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();

    const allDates = Object.keys(attendanceData).sort();

    if (allDates.length === 0) {
      alert("Bhai, pehle thodi haazri toh bhar lo!");
      return;
    }

    allDates.map((date) => {
      const dayRecord = attendanceData[date];

      const rows = dayRecord.map((record) => {
        const worker = labourList.find((labour) => labour.id === record.id);
        return {
          Date: selectedDate,
          Worker_Name: worker ? worker.name : "Unknown",
          Role: worker ? worker.role : "Unknown",
          Status: record.isPresent ? "Present" : "Absent",
          Wages: worker ? worker.wage : 0,
          
        };
      });

      const worksheet = XLSX.utils.json_to_sheet(rows);
      XLSX.utils.book_append_sheet(workbook, worksheet, date);
    });

    XLSX.writeFile(
      workbook,
      `Gwalior Attendence ${new Date().toLocaleDateString("en-US", {
        month: "short",
      })}_2026.xlsx`,
    );
  };

  return (
    <div className="space-y-6">

      {/* Advanced Filter List */}
      <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-slate-100 space-y-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
            <FaFilter size={14} />
          </div>
          <h2 className="text-xl font-black italic text-slate-900 uppercase">Report Generator</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* 1. Report Type */}
          <div className="flex flex-col gap-2 text-left">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 italic">Report Type</label>
            <select 
              value={reportSettings.type}
              onChange={(e) => setReportSettings({...reportSettings, type: e.target.value})}
              className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="daily">Daily (One Sheet)</option>
              <option value="monthly">Monthly (Full Summary)</option>
              <option value="worker-wise">Worker Performance</option>
            </select>
          </div>

          {/* 2. Category Filter */}
          <div className="flex flex-col gap-2 text-left">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 italic">Category</label>
            <select 
              value={reportSettings.category}
              onChange={(e) => setReportSettings({...reportSettings, category: e.target.value})}
              className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="all">All Roles</option>
              <option value="Mistri (Mason)">Masons (Mistri)</option>
              <option value="Majdoor (Helper)">Helpers (Majdoor)</option>
              <option value="Electrician">Electricians</option>
            </select>
          </div>

          {/* 3. Target Month (If Monthly/Worker-wise) */}
          <div className="flex flex-col gap-2 text-left">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 italic">Select Month</label>
            <input 
              type="month"
              value={reportSettings.month}
              onChange={(e) => setReportSettings({...reportSettings, month: e.target.value})}
              className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs font-bold outline-none cursor-pointer"
            />
          </div>

          {/* 4. Action Button */}
          <div className="flex items-end">
            <button 
              // onClick={generateUniversalReport} <-- Ye logic hum kal likhenge
              className="w-full h-13 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3"
            >
              <FaFileDownload /> Get Excel Report
            </button>
          </div>
        </div>
      </div>

      {/* HEADER: Date Picker & Export */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100 w-full md:w-auto">
          <FaCalendarAlt className="text-indigo-600" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-transparent font-black text-xs uppercase outline-none cursor-pointer"
          />
        </div>

        <button
          onClick={exportToExcel}
          className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-600 transition-all shadow-lg w-full md:w-auto"
        >
          <FaFileDownload /> Export Monthly Report
        </button>
      </div>

      {/* HOLIDAY ALERT: Logic based UI */}
      {isHoliday && (
        <div className="bg-amber-50 border-2 border-dashed border-amber-200 p-6 rounded-4xl flex items-center gap-4 animate-pulse">
          <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center text-white text-xl">
            <FaUmbrellaBeach />
          </div>
          <div>
            <h4 className="font-black text-amber-700 uppercase italic text-sm text-left">
              Public Holiday Detected
            </h4>
            <p className="text-[10px] font-bold text-amber-500 uppercase tracking-tighter text-left">
              All workers will be marked as "Paid Leave" for this day.
            </p>
          </div>
        </div>
      )}

      {/* WORKERS LIST: Attendance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {labourList.map((worker) => {
          // Logic: Check if worker is present on selectedDate
          const dayData = attendanceData[selectedDate] || [];
          const isPresent = dayData.find((r) => r.id === worker.id)?.isPresent;

          return (
            <div
              key={worker.id}
              className={`flex items-center justify-between p-6 rounded-[2.5rem] border-2 transition-all duration-300 ${
                isPresent
                  ? "bg-emerald-50 border-emerald-200"
                  : "bg-white border-slate-100"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white italic shadow-md ${
                    isPresent ? "bg-emerald-500" : "bg-slate-300"
                  }`}
                >
                  {worker.name.charAt(0)}
                </div>
                <div className="text-left">
                  <h3 className="font-black text-slate-800 uppercase italic text-xs">
                    {worker.name}
                  </h3>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                    {worker.role} • ₹{worker.wage}/Day
                  </p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                    {worker.mobileNo} 
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggleAttendence(worker.id)}
                disabled={isHoliday}
                className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase transition-all shadow-md ${
                  isHoliday
                    ? "bg-slate-100 text-slate-300 cursor-not-allowed"
                    : isPresent
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-900 text-white"
                }`}
              >
                {isPresent ? "Present" : "Absent"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LabourLog;
