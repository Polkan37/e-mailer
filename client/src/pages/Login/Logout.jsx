import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();
  const [logout, setLogout] = useState(true)

  useEffect( () => {
    localStorage.clear();
    navigate("/");
    setLogout(false)
    window.location.reload();

  },[logout])

  return <>Logout</>;
};
