import { createContext, useState, useEffect } from "react";
import axiosClient from "../axiosClient";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const AuthContext = createContext();
function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

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
        navigate("/");
      })
      .catch((err) => {
        setUser(null);
      });
  };

  const logout = () => {
    axiosClient.post("/auth/logout").then((res) => {
      setUser(null);
      navigate("/");
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        signup,
        projects,
        setProjects,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
