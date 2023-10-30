import { ReactNode } from "react";
import { useGetUser } from "../hooks/useUsers";
import Overlay from "./Overlay";
import { useNavigate } from "react-router-dom";
const ProtectRoutes = ({ children }: { children: ReactNode }) => {
  const { isLoading, isAuthenticated } = useGetUser();
  const navigate = useNavigate();

  // if (isLoading) return <Overlay>{children}</Overlay>;
  if (isLoading) return <p>Loading ... </p>;
  if (!isAuthenticated) return navigate("/login");
  return children;
};

export default ProtectRoutes;
