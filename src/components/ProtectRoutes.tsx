import { ReactNode } from "react";
import { useGetUser } from "../hooks/useUsers";
import Overlay from "./Overlay";
import { useNavigate } from "react-router-dom";
const ProtectRoutes = ({ children }: { children: ReactNode }) => {
  const { data, isError, isLoading, isAuthenticated } = useGetUser();
  const navigate = useNavigate();
  console.log(data, isError, isLoading);
  if (isLoading) return <Overlay>{children}</Overlay>;
  if (!isAuthenticated) return navigate("/login");
  return children;
};

export default ProtectRoutes;
