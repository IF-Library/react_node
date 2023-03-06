import { useEffect, useState } from "react";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState();


  async function fazerRequisicao(e) {
    e.preventDefault();

    const url = 'http://localhost:5000/api/authenticate';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email, password: password})
    };
    
    const resposta = await fetch(url, options);
    const dados = await resposta.json();
    console.log(dados.token);
  }

  async function chamarTasks() {
    const url = 'http://localhost:5000/api/authenticate';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email, password: password})
    };
    
    const resposta = await fetch(url, options);
    const dados = await resposta.json();
    console.log(dados.token);
  }


  return (
    <div >
    <h1 id="tituloLogin">Login</h1>
    <form id="login" onSubmit={fazerRequisicao}>
      <label>Login</label>
      <input
        placeholder="login"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Senha</label>
      <input
        placeholder="senha"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" />
    </form>
  </div>
  )
}

export default Login