import { ReactNode } from "react";
import { useGetUser } from "../hooks/useUsers";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
const ProtectRoutes = ({ children }: { children: ReactNode }) => {
  const { isLoading, isAuthenticated } = useGetUser();
  const navigate = useNavigate();

  if (isLoading) return <Loading />;
  if (!isAuthenticated) {
    navigate("/login");
    return <Loading />;
  }
  return children;
};

export default ProtectRoutes;
