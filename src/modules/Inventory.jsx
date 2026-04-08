import React, { useState } from "react";
import NewEntryForm from "../components/InventoryRelated/NewEntryForm";
import MaterialList from "../components/InventoryRelated/MaterialList";

const Inventory = ({ materials, setMaterials }) => {
  const [value, setValue] = useState("");
  const [isNewEntry, setIsNewEntry] = useState(false);
  const [newEntry, setNewEntry] = useState({
    name: "",
    qty: 0,
    unitWeight: 0,
    pricePerUnit: 0,
    category: "",
    date: "",
  });

  const handlePlus = (ID) => {
    setMaterials((prev) =>
      prev.map((item) =>
        item.id === ID ? { ...item, qty: parseInt(item.qty) + 1 } : item,
      ),
    );
  };

  const handleMinus = (ID) => {
    setMaterials((prev) =>
      prev.map((item) =>
        item.id === ID
          ? { ...item, qty: Math.max(0, parseInt(item.qty) - 1) }
          : item,
      ),
    );
  };

  const handleRemove = (ID) => {
    setMaterials((prev) => prev.filter((item) => item.id !== ID));
  };

  const filterList = materials.filter(
    (item) =>
      item.name.toLowerCase().includes(value) ||
      item.category.toLowerCase().includes(value),
  );

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleNewEntry = (e) => {
    const { name, value } = e.target;
    setNewEntry({ ...newEntry, [name]: value });
  };

  const handleSaveData = (e) => {
    e.preventDefault();
    if (newEntry.name.trim() === "" || newEntry.category.trim() === "") return;

    if (newEntry.qty > 0 && newEntry.pricePerUnit > 0) {
      setMaterials((prev) => [...prev, { id: Date.now(), ...newEntry }]);
      setNewEntry({
        name: "",
        qty: 0,
        unitWeight: 0,
        pricePerUnit: 0,
        category: "",
        date: "",
      });
      setIsNewEntry(false);
    }
  };

  return (
    <div className="bg-white rounded-[3rem] p-4 sm:p-10 mx-2 shadow-xl border border-slate-100">
      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
        <h2 className="text-2xl font-black italic text-slate-900 uppercase">
          Material Stock
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto ">
          <div className="flex justify-between items-center relative">
            <input
              type="text"
              value={value}
              onChange={handleChange}
              placeholder="Search material..."
              className="flex-1 px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {value && (
              <span
                className="cursor-pointer absolute right-5 text-slate-500"
                onClick={() => setValue("")}
              >
                x
              </span>
            )}
          </div>

          <button
            onClick={() => setIsNewEntry(!isNewEntry)}
            className={`px-6 py-3 ${isNewEntry ? "bg-rose-600" : "bg-indigo-600"} cursor-pointer text-white rounded-2xl font-bold uppercase text-[10px] tracking-widest shadow-lg`}
          >
            <span className="font-bold">{isNewEntry ? "Exit" : "Add"}</span>
          </button>
        </div>
      </div>

      {isNewEntry && (
        <NewEntryForm
          newEntry={newEntry}
          handleNewEntry={handleNewEntry}
          handleSaveData={handleSaveData}
        />
      )}

      {/* Material Table UI */}
      <MaterialList
        handleMinus={handleMinus}
        handlePlus={handlePlus}
        handleRemove={handleRemove}
        filterList={filterList}
      />

      {materials.length>0 && <div className="flex justify-center items-center mt-4">
        <button
        onClick={() => setMaterials([])}
        className={`w-full sm:w-fit mx-4 px-6 py-3 bg-rose-600 cursor-pointer text-white rounded-2xl font-bold uppercase text-[10px] tracking-widest shadow-lg`}
      >
        <span className="font-bold">Clear All</span>
      </button>
      </div>}
    </div>
  );
};

export default Inventory;
