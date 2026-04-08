import React from 'react'

const MaterialList = ({filterList,handlePlus,handleMinus,handleRemove}) => {
  return (

    <>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filterList.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-4xl border border-slate-100 shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] font-bold text-indigo-500 uppercase">{item.date}</p>
                <h3 className="font-black text-slate-800 uppercase italic">{item.name}</h3>
                <p className="text-[10px] text-slate-400 font-bold">{item.category}</p>
              </div>
              <span className={`px-2 py-1 ${item.qty < 10 ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"} text-[8px] font-black rounded-lg uppercase`}>
                {item.qty < 10 ? "Low" : "In Stock"}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-6  my-2">
              <div>
                <p className="text-[8px] font-black text-slate-400 uppercase">Price Per Unit</p>
                <p className="text-sm font-black text-slate-700 italic">₹{item.pricePerUnit}</p>
              </div>
              <div>
                <p className="text-[8px] font-black text-slate-400 uppercase">Total Price</p>
                <p className="text-sm font-black text-slate-700 italic">₹{item.qty * item.pricePerUnit}</p>
              </div>
              <div className=''>
                <p className="text-[8px] font-black text-slate-400 uppercase">Weight Per Unit</p>
                <p className="text-sm font-black text-slate-700 italic">{item.unitWeight} kg</p>
              </div>
              <div>
                <p className="text-[8px] font-black text-slate-400 uppercase">Total Weight</p>
                <p className="text-sm font-black text-slate-700 italic">{item.qty * item.unitWeight} kg</p>
              </div>
              <div className="flex items-center justify-between bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                  <button onClick={() => handleMinus(item.id)} className="font-black text-slate-400">-</button>
                  <span className="font-black text-xs italic">{item.qty}</span>
                  <button onClick={() => handlePlus(item.id)} className="font-black text-indigo-600">+</button>
               </div>
               <button onClick={() => handleRemove(item.id)} className="text-rose-500 font-black text-[10px] uppercase">Remove</button>
            </div>

            <div className="flex justify-between items-center">
               
            </div>
          </div>
        ))}
      </div>

      {/* Desktop view */}
      <div className="hidden sm:block overflow-x-auto mt-24">
        <table className="w-full text-center">
          <thead>
            <tr className="text-[10px]  font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
              <th className="pb-4 pl-4">Date</th>
              <th className="pb-4 pl-4">Item Name</th>
              <th className="pb-4">Quantity</th>
              <th className="pb-4">Price Per Unit</th>
              <th className="pb-4">Total Price</th>
              <th className="pb-4">Weight Per Unit</th>
              <th className="pb-4">Total Weight</th>
              <th className="pb-4">Status</th>
              <th className="pb-4 text-right pr-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filterList.map((item) => (
              <tr
                key={item.id}
                className="group hover:bg-slate-50/50 transition-all"
              >
                <td className='py-6 pl-4'>
                  <p className="font-black text-slate-700 uppercase italic text-sm">
                    {item.date}
                  </p>
                </td>
                <td className="py-6">
                  
                  <p className="font-black text-slate-700 uppercase italic text-sm">
                    {item.name}
                  </p>
                  <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase">
                    {item.category}
                  </p>
                </td>
                <td className="py-6">
                  <div className="flex items-center gap-3 bg-white w-max px-3 py-1.5 rounded-xl border border-slate-100">
                    <button
                      disabled={item.qty === 0}
                      className="disabled:opacity-50 disabled:cursor-not-allowed font-black text-slate-300 cursor-pointer"
                      onClick={() => handleMinus(item.id)}
                    >
                      -
                    </button>
                    <span className="font-black text-xs italic">
                      {item.qty}
                    </span>
                    <button
                      className="font-black text-indigo-600 cursor-pointer"
                      onClick={() => handlePlus(item.id)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="py-6 font-black text-xs text-slate-600 italic">
                  ₹{item.pricePerUnit}
                </td>
                <td className="py-6 font-black text-xs text-slate-600 italic">
                  ₹{item.qty * item.pricePerUnit}
                </td>
                <td className="py-6 font-black text-xs text-slate-600 italic">
                  {item.unitWeight}
                </td>
                <td className="py-6 font-black text-xs text-slate-600 italic">
                  {item.qty * item.unitWeight}
                </td>
                <td className="py-6">
                  <span
                    className={`px-3 py-1  ${item.qty < 10 ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"}  text-[8px] font-black rounded-lg uppercase`}
                  >
                    {item.qty < 10 ? "Low" : "In Stock"}
                  </span>
                </td>
                <td className="py-6 text-right pr-4">
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-rose-400 hover:text-rose-600 font-bold text-[10px] uppercase"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </>
  )
}

export default MaterialList
