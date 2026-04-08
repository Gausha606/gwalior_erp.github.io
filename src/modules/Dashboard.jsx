import React from "react";
import StatCard from "../components/StatCard";
import { MdOutlineInventory } from "react-icons/md";
import { FaPeopleCarry } from "react-icons/fa";
import { FaMoneyBillTransfer, FaMoneyCheckDollar } from "react-icons/fa6";

const Dashboard = ({
  materials,
  activeWorkers,
  labourList,
  otherExpense,
  siteExpenses,
}) => {
  let totalWeight = materials.reduce(
    (total, item) => total + item.qty * item.unitWeight,
    0,
  );
  let lowStockCount = materials.filter((item) => item.qty < 10).length;
  let labourLength = (activeWorkers / labourList.length) * 100;

  let reverseArr = materials.toReversed().slice(0,5);

  return (
    <div className="space-y-10">
      {/* Top Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <StatCard
          title="Active Labour"
          value={activeWorkers}
          icon={<FaPeopleCarry />}
          color="bg-emerald-500"
          trend="On-Site"
          bar={labourLength}
        />
        <StatCard
          title="Total Inventory"
          value={`${totalWeight} kg`}
          icon={<MdOutlineInventory />}
          color="bg-indigo-600"
          trend={`${lowStockCount} stock ends`}
        />
        <StatCard
          title="Site Expenses"
          value={`₹${siteExpenses}`}
          icon={<FaMoneyCheckDollar />}
          color="bg-amber-500"
        />
        <StatCard
          title="Other Expenses"
          value={`₹${otherExpense}`}
          icon={<FaMoneyBillTransfer />}
          color="bg-rose-500"
        />
      </div>

      {/* Quick Logs View (Just UI) */}
      <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-slate-100">
        <h3 className="font-black italic text-slate-800 uppercase mb-6">
          Recent Site Activity
        </h3>
        <div className="space-y-4">
          {reverseArr.map((item) => (
            <div
              key={item.id}
              className="flex sm:flex-row flex-col gap-4 items-center justify-between p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200"
            >
              <span className="text-[10px] font-black text-slate-400">
                {new Date(item.date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="text-xs text-center font-bold text-slate-700 uppercase">
                {item.name} {item.qty} {item.category} Received
              </span>
              <span className="text-[10px] font-black text-indigo-600 uppercase">
                Verified
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
