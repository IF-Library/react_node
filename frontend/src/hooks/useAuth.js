import { useState, useEffect } from "react";
// useSelector para pegar os dados que guardamos no redux (storage)
import { useSelector } from "react-redux";

export const useAuth = () => {
  // selecionada a propriedade user do objeto auth do estado global.
  const { user } = useSelector((state) => state.auth);

  // O primeiro estado, auth, é inicializado como false, o que significa que o usuário não está 
  // autenticado no momento. O segundo estado, loading, é inicializado como true, o que significa 
  // que o aplicativo está carregando os dados de autenticação do usuário.
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  // useEffect roda toda vez que que a propriedade [user] muda
  useEffect(() => {
    // se tiver user então o auth (autenticado) é setado como true
    if (user) {
      setAuth(true);
    } else {
      setAuth(false);
    }
    // depois de verificado se user está autenticado ou não, load é setado para false
    setLoading(false);
  }, [user]);

  return { auth, loading };
};