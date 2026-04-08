import { IoClose } from "react-icons/io5";

const Add_Save = ({
  isAdding,
  isEditing,
  setIsAdding,
  setNewEntry,
  defaultState,
  newEntry,
  handleNewEntry,
  handleSubmit,
}) => {
  return (
    <div>
      {isAdding ? (
        <div className="relative grid grid-cols-1 gap-4 bg-white rounded-[2.5rem] p-10 shadow-2xl border border-slate-100 ">
          <button
            onClick={() => {
              setIsAdding(false);
              setNewEntry(defaultState);
            }}
            className="w-8 h-8 bg-red-500 absolute top-5 right-5 rounded-full text-white cursor-pointer flex justify-center items-center"
          >
            <IoClose size={20} />
          </button>
          {/* Full Name */}
          <div className="mt-4">
            <label
              htmlFor="name"
              className="text-[10px] font-black text-slate-400 uppercase ml-2 italic"
            >
              Full Name
            </label>
            <input
              name="name"
              id="name"
              value={newEntry.name}
              onChange={handleNewEntry}
              placeholder="e.g. Raju Kaul"
              className="w-full font-bold  border-2 border-indigo-100 focus:border-indigo-600  p-3 rounded-xl  outline-none transition-all placeholder:font-medium"
            />
          </div>

          {/* Role  */}
          <div>
            <label
              htmlFor="role"
              className="text-[10px] font-black text-slate-400 uppercase ml-2 italic "
            >
              Role
            </label>
            <select
              name="role"
              id="role"
              value={newEntry.role}
              onChange={handleNewEntry}
              className="w-full border-2 border-indigo-100 focus:border-indigo-600 p-3 rounded-xl  outline-none transition-all cursor-pointer"
            >
              <option value="" disabled>
                Choose an option
              </option>
              <option value="Mistri">Mistri</option>
              <option value="Majdoor">Majdoor</option>
              <option value="Electrician">Electrician</option>
              <option value="Site Supervisor">Site Supervisor</option>
              <option value="Painter">Painter</option>
              <option value="Operator">Operator</option>
              <option value="Putty">Putty</option>
            </select>
          </div>

          {/* Contact  */}
          <div>
            <label
              htmlFor="contact"
              className="text-[10px] font-black text-slate-400 uppercase ml-2 italic "
            >
              Contact
            </label>
            <input
              name="contact"
              id="contact"
              value={newEntry.contact}
              onChange={handleNewEntry}
              placeholder="e.g. 9746453267"
              className="w-full font-bold border-2 border-indigo-100 focus:border-indigo-600 p-3 rounded-xl  outline-none transition-all placeholder:font-medium"
            />
          </div>

          {/* wage */}
          <div>
            <label
              htmlFor="wage"
              className="text-[10px] font-black text-slate-400 uppercase ml-2 italic "
            >
              Wage
            </label>
            <input
              type="number"
              name="wage"
              id="wage"
              step={100}
              value={newEntry.wage}
              onChange={handleNewEntry}
              placeholder="0"
              className="w-full border-2 border-indigo-100 focus:border-indigo-600 p-3 rounded-xl outline-none cursor-pointer"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleSubmit}
              className="w-fit px-4 py-2 h-13 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 cursor-pointer"
            >
              {isEditing ? "Save The Details" : "Add New Person"}
            </button>
          </div>
        </div>
      ) : (
        <div className="p-20 bg-white shadow-xl rounded-4xl flex flex-col justify-center border border-slate-500 border-dashed items-center">
          <p className="mb-6 text-3xl font-semibold uppercase">
            Want to add more staff for work?
          </p>
          <button
            onClick={() => setIsAdding(true)}
            className="bg-indigo-600 hover:scale-105 hover:bg-indigo-500 transition-all duration-300 p-4 rounded-2xl text-white cursor-pointer"
          >
            + Add New Member
          </button>
        </div>
      )}
    </div>
  );
};

export default Add_Save;
