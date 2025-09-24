import { useEffect } from "react";
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"

const Main = () => {
    const checkRole = useSelector(user => user.user.account.role);
    const user = useSelector((state) => state.user?.isAuthenticated);
    const navigate = useNavigate();
     useEffect(() => {
      if (checkRole === "tutor") {
        navigate("/tutor");
      } else if (checkRole === "student") {
        navigate("/");
      } else if (checkRole === "admin") {
        navigate("/admin/dashboard");
      }
  }, [user, checkRole, navigate]);
    return (
        <>
            <Outlet />
        </>
    )
}
export default Main