import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const AdminRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasUsername, setHasUsername] = useState(true);  // флаг наличия username

  useEffect(() => {
    const checkAccess = async () => {
      const username = localStorage.getItem("username");
      if (!username) {
        setHasUsername(false);
        setIsLoading(false);
        return;
      }

      try {
        const res = await axios.post("http://localhost/reactApp/AdminRoute.php", {
          username,
        });

        if (res.data.status === "admin") {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error("Ошибка проверки статуса:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAccess();
  }, []);

  if (isLoading) return <div>Загрузка...</div>;

  if (!hasUsername) return <Navigate to="/PageNotFound" replace />;  // если нет username — редирект на логин
  if (!isAdmin) return <Navigate to="/PageNotFound" replace />;           // если не админ — редирект на главную

  return children;
};

export default AdminRoute;
