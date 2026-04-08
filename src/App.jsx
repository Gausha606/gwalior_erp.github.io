import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./modules/Dashboard.jsx";
import Inventory from "./modules/Inventory.jsx";
import LabourLog from "./modules/LabourLog.jsx";
import initialMaterial from "./data/initialData.js";
import { initialLabour } from "./data/initialData.js";
import Expenses from "./modules/Expenses.jsx";

function App() {

  const [activeTab, setActiveTab] = useState("dashboard");

  const [materials, setMaterials] = useState(()=>{
    const saved = localStorage.getItem("Site_Materials");
    return saved ? JSON.parse(saved) : initialMaterial;
  });

  const [labourList, setLabourList] = useState(()=>{
    const saved = localStorage.getItem("Site_Labours");
    return saved ? JSON.parse(saved) : initialLabour;
  });

  const [attendanceData, setAttendanceData] = useState(()=>{
    const saved = localStorage.getItem("Site_Attendence");
    return saved ? JSON.parse(saved) : {};
  });

  const [expenses, setExpenses] = useState(()=>{
    const saved = localStorage.getItem("Site_Expenses");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(()=>{
    localStorage.setItem("Site_Materials",JSON.stringify(materials));
  },[materials])

  useEffect(()=>{
    localStorage.setItem("Site_Labours",JSON.stringify(labourList));
  },[labourList])

  useEffect(()=>{
    localStorage.setItem("Site_Attendence",JSON.stringify(attendanceData));
  },[attendanceData])

  useEffect(()=>{
    localStorage.setItem("Site_Expenses",JSON.stringify(expenses));
  },[expenses])

  const today = new Date().toISOString().split("T")[0];

  const todaysAttendence = attendanceData[today] || [];
  const activeWorkers = todaysAttendence.filter((labour)=>labour.isPresent).length;
  const otherExpense = expenses.reduce((total,curr)=>total + curr.amount,0);
  const siteExpenses = materials.reduce((total,curr)=>total + (curr.qty*curr.pricePerUnit),0);
  console.log(siteExpenses)

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 md:ml-56 p-5 md:p-12 transition-all duration-300 pt-20">
        {/* Dynamic Navigation Logic */}
        {activeTab === "dashboard" && (
          <Dashboard setActiveTab={setActiveTab} materials={materials} activeWorkers={activeWorkers} labourList={labourList} otherExpense={otherExpense} siteExpenses={siteExpenses} />
        )}
        {activeTab === "inventory" && (
          <Inventory materials={materials} setMaterials={setMaterials} />
        )}
        {activeTab === "labour" && (
          <LabourLog
            labourList={labourList}
            attendanceData={attendanceData}
            setAttendanceData={setAttendanceData}
            setLabourList={setLabourList}
          />
        )}

        {/* Add Expense Placeholder for later */}
        {activeTab === "expense" && (
         <Expenses expenses={expenses} setExpenses={setExpenses} />
        )}
      </main>
    </div>
  );
}

export default App;

/* [
  { id: 1, date: "2026-04-07", category: "Diesel", amount: 2500, desc: "Generator fuel for slab casting",paymentMode: "Cash" },
  { id: 2, date: "2026-04-07", category: "Chai-Nashta", amount: 300, desc: "Evening tea for 15 workers", paymentMode: "Online" }
]
*/
