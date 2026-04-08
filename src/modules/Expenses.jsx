import React, { useState } from "react";
import { FaPlus, FaWallet, FaReceipt, FaTrashAlt } from "react-icons/fa";

const Expenses = ({ expenses, setExpenses }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newExpense, setNewExpense] = useState({
    date: new Date().toISOString().split("T")[0],
    category: "Chai-Nashta",
    amount: "",
    desc: "",
    paymentMode: "Cash",
  });

  const handleInputChange = (e) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };

  const addExpense = (e) => {
    e.preventDefault();
    if (!newExpense.amount || !newExpense.desc) return;
    
    setExpenses([...expenses, { id: Date.now(), ...newExpense, amount: Number(newExpense.amount) }]);
    setNewExpense({ ...newExpense, amount: "", desc: "" });
    setIsAdding(false);
  };

  const totalExpense = expenses?.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-8 text-left">
      {/* 💰 TOP SUMMARY CARD */}
      <div className="bg-linear-to-br from-indigo-500 to-indigo-700 rounded-[3rem] p-10 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] opacity-80">Total Site Expenditure</p>
          <h2 className="text-5xl font-black italic mt-2">₹{totalExpense?.toLocaleString()}</h2>
        </div>
        <FaWallet className="absolute -right-10 -bottom-10 text-[15rem] opacity-10 rotate-12 animate-pulse" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 📝 LEFT: QUICK ENTRY FORM */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 sticky top-8">
            <h3 className="text-lg font-black italic text-slate-800 uppercase mb-6 flex items-center gap-2">
              <FaPlus className="text-indigo-500 text-sm" /> New Entry
            </h3>
            
            <form onSubmit={addExpense} className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 italic">Amount (₹)</label>
                <input name="amount" type="number" step={10} value={newExpense.amount} onChange={handleInputChange} placeholder="0.00" className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 italic">Category</label>
                <select name="category" value={newExpense.category} onChange={handleInputChange} className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm font-bold outline-none cursor-pointer">
                  <option>Chai-Nashta</option>
                  <option>Diesel/Fuel</option>
                  <option>Transport</option>
                  <option>Emergency Material</option>
                  <option>Labour Advance</option>
                  <option>Misc.</option>
                </select>
              </div>

              <div>
              <label htmlFor="date" className="text-xs text-neutral-400 ml-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                value={newExpense.date}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full  border-2 border-slate-300 focus:border-indigo-500 p-3 rounded-xl outline-none"
              />
            </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 italic">Payment Mode</label>
                <div className="flex gap-2">
                  {["Cash", "Online", "Udhaar"].map((mode) => (
                    <button key={mode} type="button" onClick={() => setNewExpense({...newExpense, paymentMode: mode})} className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase border-2 cursor-pointer transition-all ${newExpense.paymentMode === mode ? "bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-100" : "border-slate-100 text-slate-400"}`}>
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 italic">Description</label>
                <textarea name="desc" value={newExpense.desc} onChange={handleInputChange} placeholder="Kyun kharch hua?" className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500 h-24" />
              </div>

              <button type="submit" className="cursor-pointer w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-600 hover:scale-105 duration-300  transition-all shadow-xl">
                Save Expense
              </button>
            </form>
          </div>
        </div>

        {/* 📜 RIGHT: EXPENSE HISTORY */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100">
            <h3 className="text-lg font-black italic text-slate-800 uppercase mb-8">Expense Log</h3>
            <div className="space-y-6">
              {expenses?.length === 0 ? (
                <div className="py-20 text-center italic text-slate-300 font-bold uppercase tracking-widest text-xs">No entries found</div>
              ) : (
                expenses?.map((exp) => (
                  <div key={exp.id} className={`group flex items-center justify-between p-6 bg-slate-50 rounded-4xl border-2 border-transparent ${exp.paymentMode==="Udhaar" ? "hover:border-rose-200" : exp.paymentMode==="Cash" ? "hover:border-emerald-200" : "hover:border-amber-200"} hover:scale-105 duration-300  transition-all`}>
                    <div className="flex items-center gap-5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${exp.paymentMode === 'Udhaar' ? 'bg-rose-500' : exp.paymentMode==="Cash" ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                        <FaReceipt className="animate-pulse"/>
                      </div>
                      <div>
                        <p className="font-black text-slate-700 uppercase italic text-xs">{exp.desc}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter bg-white px-2 py-0.5 rounded-md border border-slate-100">{exp.category}</span>
                          <span className="text-[9px] font-black text-indigo-400 uppercase tracking-tighter italic">{exp.date}</span>
                          <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-md ${exp.paymentMode === 'Udhaar' ? 'bg-rose-100 text-rose-600' : exp.paymentMode==="Cash" ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>{exp.paymentMode}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <p className="font-black text-slate-800 italic">₹{exp.amount}</p>
                      <button onClick={() => setExpenses(expenses.filter(e => e.id !== exp.id))} className="text-slate-300 hover:text-rose-500 transition-colors cursor-pointer">
                        <FaTrashAlt size={12} />
                      </button>
                    </div>
                  </div>
                )).reverse()
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;