import { createContext, useState, useEffect } from "react";
import axiosClient from "../axiosClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const AuthContext = createContext();
function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [views, setViews] = useState("");


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
        toast.success("Login successful");
      })
      .catch((err) => {
        setUser(null);
        toast.error("Login failed");
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
        toast.success("Signup successful");
      })
      .catch((err) => {
        setUser(null);
        toast.error("Signup failed. Try again");
      });
  };

  const logout = () => {
    axiosClient.post("/auth/logout").then((res) => {
      setUser(null);
      navigate("/");
      toast.success("Logout successful");
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/projects/sort?createdAt=-1")
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
        views,
        setViews
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
