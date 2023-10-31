// import FilterDashboard from "../components/FilterContainer";
import DashContent from "../components/DashContent";

const Dashboard = () => {
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">Dashboard</p>
        <div>{/* <FilterDashboard section="dashboard" /> */}</div>
      </div>
      <DashContent />
    </div>
  );
};

export default Dashboard;
