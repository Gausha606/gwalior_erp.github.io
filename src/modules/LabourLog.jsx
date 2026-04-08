import React, { useState } from "react";
import { FaFilter, FaFileDownload, FaUmbrellaBeach } from "react-icons/fa";
import * as XLSX from "xlsx";
import FilterEngine from "../components/LabourPageRelated/FilterEngine";
import Add_Save from "../components/LabourPageRelated/Add_Save";

const LabourLog = ({
  labourList,
  setLabourList,
  attendanceData,
  setAttendanceData,
}) => {
  const defaultState = {
    name: "",
    role: "",
    contact: "",
    wage: 0,
  };

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newEntry, setNewEntry] = useState(defaultState);

  const handleNewEntry = (e) => {
    setNewEntry((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (
      newEntry.name.trim() === "" ||
      newEntry.role.trim() === "" ||
      newEntry.wage < 0
    )
      return;
    if (isEditing) {
      setLabourList((prev) =>
        prev.map((labour) =>
          labour.id === newEntry.id
            ? { ...newEntry, wage: Number(newEntry.wage) }
            : labour,
        ),
      );
      setNewEntry(defaultState);
      setIsEditing(false);
    } else {
      setLabourList((prev) => [
        ...prev,
        { id: Date.now(), ...newEntry, wage: Number(newEntry.wage) },
      ]);
      setNewEntry(defaultState);
    }
    setIsAdding(false);
  };

  console.log(newEntry);
  console.log(labourList);

  const holidays = ["2026-04-05", "2026-04-12", "2026-04-19", "2026-04-26"];
  const isHoliday = holidays.includes(selectedDate);

  const [reportSettings, setReportSettings] = useState({
    type: "daily",
    category: "all",
    workerId: "all",
    month: new Date().toISOString().slice(0, 7),
  });

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

  const generateUniversalReport = () => {
    const workbook = XLSX.utils.book_new();
    const { type, category, month, workerId } = reportSettings;

    let targetDates = Object.keys(attendanceData).filter((date) =>
      date.startsWith(month),
    );

    if (type === "daily") {
      targetDates = [selectedDate];
    }

    if (targetDates.length === 0) {
      alert("Bhai, is range mein koi data nahi mila!");
      return;
    }

    let finalReportData = [];

    targetDates.forEach((date) => {
      const dayRecords = attendanceData[date] || [];
      const isTodayHoliday = holidays.includes(date);

      // Filter Workers based on Category
      const filteredWorkers = labourList.filter((w) =>
        category === "all" ? true : w.role === category,
      );

      const rows = filteredWorkers.map((worker) => {
        const record = dayRecords.find((r) => r.id === worker.id);
        const isPresent = record ? record.isPresent : false;

        // --- WAGES LOGIC (The Main Point) ---
        // Agar Holiday hai toh full wage, warna present hai toh full, absent toh 0
        const earnedWage = isTodayHoliday
          ? worker.wage
          : isPresent
            ? worker.wage
            : 0;
        const statusText = isTodayHoliday
          ? "HOLIDAY (PAID)"
          : isPresent
            ? "PRESENT"
            : "ABSENT";

        return {
          Date: date,
          Worker_Name: worker.name,
          Role: worker.role,
          Status: statusText,
          Daily_Rate: worker.wage,
          Amount_Earned: earnedWage, // Ye hai contractor ka asli hisab
          Site: "Gwalior Site A-1",
        };
      });

      // 3. EXCEL STRUCTURE SELECTION
      if (type === "daily" || type === "worker-wise") {
        // Ek hi sheet mein saara data niche niche (Vertical)
        finalReportData = [...finalReportData, ...rows];
      } else {
        // Monthly: Har date ki alag sheet (Tab)
        const worksheet = XLSX.utils.json_to_sheet(rows);
        XLSX.utils.book_append_sheet(workbook, worksheet, date);
      }
    });

    // 4. FINAL DOWNLOAD LOGIC
    if (type === "daily" || type === "worker-wise") {
      const worksheet = XLSX.utils.json_to_sheet(finalReportData);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Report_Summary");
    }

    XLSX.writeFile(workbook, `Gwalior_ERP_Report_${type}_${month}.xlsx`);
  };

  const handleEdit = (ID) => {
    setIsAdding(true);
    setIsEditing(true);

    const workerToEdit = labourList.find((labour) => labour.id === ID);

    if (workerToEdit) {
      setNewEntry(workerToEdit);
    }
  };

  return (
    <div className="space-y-6">
      {/* Advance Filter */}
      <FilterEngine
        reportSettings={reportSettings}
        setReportSettings={setReportSettings}
        generateUniversalReport={generateUniversalReport}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

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

      {/* Adding a new labour or Editing an existing labour */}
      <Add_Save
        isAdding={isAdding}
        isEditing={isEditing}
        setIsAdding={setIsAdding}
        newEntry={newEntry}
        handleNewEntry={handleNewEntry}
        handleSubmit={handleSubmit}
        setNewEntry={setNewEntry}
        defaultState={defaultState}
      />

      {/* WORKERS LIST: Attendance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {labourList.map((worker) => {
          // Logic: Check if worker is present on selectedDate
          const dayData = attendanceData[selectedDate] || [];
          const isPresent = dayData.find((r) => r.id === worker.id)?.isPresent;

          return (
            <div
              key={worker.id}
              className={`flex items-center justify-between p-6 rounded-[2.5rem] border-2 transition-all duration-300 hover:scale-105 ${
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
                  <p className="text-[12px] font-bold text-slate-400 mt-1 tracking-tighter">
                    Contact: {worker.contact}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(worker.id)}
                  className={`px-6 py-2 bg-indigo-500 text-white rounded-xl text-[9px] font-black uppercase transition-all shadow-md cursor-pointer ${
                    isHoliday &&
                    "bg-slate-100 text-slate-300 cursor-not-allowed"
                  }`}
                >
                  Edit
                </button>

                <button
                  onClick={() => toggleAttendence(worker.id)}
                  disabled={isHoliday}
                  className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase transition-all shadow-md ${
                    isHoliday
                      ? "bg-slate-100 text-slate-300 cursor-not-allowed"
                      : isPresent
                        ? "bg-emerald-600 text-white cursor-pointer"
                        : "bg-slate-900 text-white cursor-pointer"
                  }`}
                >
                  {isPresent ? "Present" : "Absent"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

         {labourList.length===0 && 
        <div className="w-full flex justify-center items-center py-20 text-center italic text-slate-400 font-bold uppercase tracking-widest text-xs animate-pulse">
          No workers added yet! Start by adding new labourers to the list.
          </div>
        }

      {labourList.length > 0 && <div className="flex justify-center items-center">
        <button
        onClick={() => setLabourList([])}
        className={`w-full sm:w-fit mx-4 px-6 py-3 bg-rose-600 hover:scale-105 transition-all duration-300 cursor-pointer text-white rounded-2xl font-bold uppercase text-[10px] tracking-widest shadow-lg`}
      >
        <span className="font-bold">Clear All</span>
      </button>
      </div>}
    </div>
  );
};

export default LabourLog;
