import { useState } from 'react'
import { Link } from 'react-router-dom';



const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            name,
            email,
            password,
        }
        console.log(user)
    }

    return (
        <div>
            <p>Registe-se</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <input
                    type="text"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <input type="submit" value="login" />
            </form>
            <p>
                Já tem conta? <Link to="/account/login">Clique Aqui</Link>
            </p>
        </div>
    )
}

export default Register