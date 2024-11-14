function Users() {
  return (
    <div className="w-full h-full flex justify-center items-start p-6">
      <div className="shadow-2xl  border-t border-[rgba(0,0,0,0.1)] rounded-md px-4 py-10 w-full ">
        <h1 className="w-full font-bold text-5xl">Users Details</h1>
        <div className="mt-5">
          <div className="flex items-center">
            <p className="font-bold text-xl w-full bg-slate-200 py-2 px-4 border-r border-gray-700">
              Name
            </p>
            <p className="font-bold text-xl w-full bg-slate-200 py-2 px-4 border-r border-gray-700">
              Email
            </p>
            <p className="font-bold text-xl w-full bg-slate-200 py-2 px-4 border-r border-gray-700">
              Roll
            </p>
            <p className="font-bold text-xl w-full bg-slate-200 py-2 px-4 border-r border-gray-700">
              Number
            </p>
            <p className="font-bold text-xl w-full bg-slate-200 py-2 px-4">
              Actions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Users;
