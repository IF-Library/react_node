import { useState, useEffect } from "react";
// useSelector para pegar os dados que guardamos no redux (storage)
import { useSelector } from "react-redux";

export const useAuth = () => {
    const { user } = useSelector((state) => state.auth);
  
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      if (user) {
        setAuth(true);
      } else {
        setAuth(false);
      }
  
      setLoading(false);
    }, [user]);
  
    return { auth, loading };
  };