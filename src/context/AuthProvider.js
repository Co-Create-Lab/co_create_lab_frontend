import { createContext, useState, useEffect } from "react";
import axiosClient from "../axiosClient";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();
function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get(`/users/profile`)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  const login = ({ ...loginData }) => {
    axiosClient
      .post("/auth/login", {
        ...loginData,
      })
      .then((res) => {
        setUser(res.data);
        navigate("/profile");
      })
      .catch((err) => {
        setUser(null);
      });
  };

  const signup = ({ ...userData }) => {
    axiosClient
      .post("/auth/signup", {
        ...userData,
      })
      .then((res) => {
        setUser(res.data);
        navigate("/profile");
      })
      .catch((err) => {
        setUser();
      });
  };

  const logout = () => {
    axiosClient.post("/auth/logout").then((res) => {
      setUser(null);
      navigate("/");
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
