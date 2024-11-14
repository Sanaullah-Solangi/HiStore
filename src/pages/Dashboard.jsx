function Dashboard() {
  return (
    <div className="w-full h-full flex justify-center items-start p-6">
      <div className="shadow-2xl  border-t border-[rgba(0,0,0,0.1)] rounded-md px-4 py-10 w-full ">
        <div className="pb-6">
          <h1 className="font-bold text-5xl">Admin Dashboard</h1>
          <p className="text-xl pt-2">
            This is Dashboard where you can manage your websites controlls and
            you can see summary of users,orders,products here.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          <div className="w-full h-48 flex flex-col justify-center items-center gap-2 shadow-xl text-2xl rounded-md bg-blue-400 text-white">
            Total Users
            <span className="text-4xl font-bold">1</span>
          </div>
          <div className="w-full h-48 flex flex-col justify-center items-center gap-2 shadow-xl text-2xl rounded-md bg-green-400 text-white">
            Total Products
            <span className="text-4xl font-bold">15</span>
          </div>
          <div className="w-full h-48 flex flex-col justify-center items-center gap-2 shadow-xl text-2xl rounded-md bg-red-400 text-white">
            Total Orders
            <span className="text-4xl font-bold">10</span>
          </div>
          <div className="w-full h-48 flex flex-col justify-center items-center gap-2 shadow-xl text-2xl rounded-md bg-purple-400 text-white lg:col-span-4 xl:col-span-1">
            Total Revenue
            <span className="text-4xl font-bold">1234 $</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
