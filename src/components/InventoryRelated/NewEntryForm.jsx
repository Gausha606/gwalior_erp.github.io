import React from 'react'

const NewEntryForm = ({newEntry,handleNewEntry,handleSaveData}) => {
  return (
    <form
          className="w-full   border border-slate-200 p-8 rounded-3xl shadow-2xl space-y-5 my-4"
        >
          <h2 className="text-2xl font-bold text-indigo-400 mb-6">
            Add New Item
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Item Name */}
            <div className="md:col-span-2">
              <label htmlFor="name" className="text-xs text-neutral-400 ml-1">
                Item Name
              </label>
              <input
                name="name"
                id="name"
                value={newEntry.name}
                onChange={handleNewEntry}
                placeholder="e.g. Asian Paints"
                className="w-full  border-2 border-slate-300 focus:border-indigo-500  p-3 rounded-xl  outline-none transition-all"
              />
            </div>

            {/* Quantity */}
            <div>
              <label htmlFor="qty" className="text-xs text-neutral-400 ml-1">
                Quantity
              </label>
              <input
                type="number"
                name="qty"
                id="qty"
                value={newEntry.qty}
                onChange={handleNewEntry}
                placeholder="0"
                className="w-full  border-2 border-slate-300 focus:border-indigo-500 p-3 rounded-xl outline-none"
              />
            </div>

            {/* Unit Weight */}
            <div>
              <label
                htmlFor="unitWeight"
                className="text-xs text-neutral-400 ml-1"
              >
                Unit Weight (kg/g)
              </label>
              <input
                type="number"
                name="unitWeight"
                id="unitWeight"
                step={10}
                value={newEntry.unitWeight}
                onChange={handleNewEntry}
                placeholder="e.g. 5kg"
                className="w-full  border-2 border-slate-300 focus:border-indigo-500 p-3 rounded-xl outline-none"
              />
            </div>

            {/* Price Per Unit */}
            <div>
              <label
                htmlFor="pricePerUnit"
                className="text-xs text-neutral-400 ml-1"
              >
                Price Per Unit
              </label>
              <input
                type="number"
                name="pricePerUnit"
                id="pricePerUnit"
                step={100}
                value={newEntry.pricePerUnit}
                onChange={handleNewEntry}
                placeholder="₹ 0.00"
                className="w-full  border-2 border-slate-300 focus:border-indigo-500 p-3 rounded-xl outline-none"
              />
            </div>

            {/* Date */}
            <div>
              <label htmlFor="date" className="text-xs text-neutral-400 ml-1">
                Quantity
              </label>
              <input
                type="date"
                name="date"
                id="date"
                value={newEntry.date}
                onChange={handleNewEntry}
                placeholder="0"
                className="w-full  border-2 border-slate-300 focus:border-indigo-500 p-3 rounded-xl outline-none"
              />
            </div>

            {/* Category Dropdown */}
            <div className="md:col-span-2">
              <label
                htmlFor="category"
                className="text-xs text-neutral-400 ml-1"
              >
                Category
              </label>
              <input
                name="category"
                id="category"
                value={newEntry.category}
                onChange={handleNewEntry}
                placeholder="e.g. Cement/ Bricks etc."
                className="w-full  border-2 border-slate-300 focus:border-indigo-500 p-3 rounded-xl  outline-none transition-all"
              />
            </div>

            
          </div>

          <button
            onClick={handleSaveData}
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl mt-4 transition-colors shadow-lg shadow-blue-900/20 cursor-pointer"
          >
            Save Item Data
          </button>
        </form>
  )
}

export default NewEntryForm
