import React from 'react'
// Hooks
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

// Components
import Message from '../../components/Message';
import { Link } from 'react-router-dom';

// Redux
import { login, reset } from '../../slices/authSlice';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // permite utilizarmos funções do redux que definimos no slice
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    }
    dispatch(login(user));
  }
  // clean all states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id="login">
      <h2>InstaFake</h2>
      <p className="subtitle">Registe-se</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email || ""}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password || ""}
        />
        {!loading && <input type="submit" value="Entrar" />}
        {loading && <input type="submit" value="aguarde..." disabled />}
        {error && <Message msg={error} type="error" />}
        <p>
          Ainda não tem conta? <Link to="/account/register">Clique Aqui</Link>
        </p>
      </form>
    </div>
  )
}

export default Login