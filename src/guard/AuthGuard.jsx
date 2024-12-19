import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AuthGuard({ children }) {
  const { token } = useSelector((state) => state.auth);

  if (!token) return <Navigate to="/" replace />;

  return children;
}

export default AuthGuard;
