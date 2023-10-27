import CreateUser from "../components/CreateUser";

const Users = () => {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-2xl">Create New User </p>
      </div>
      <CreateUser />
    </div>
  );
};

export default Users;
