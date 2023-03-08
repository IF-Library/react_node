import "./Auth.css";

// Hooks
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

// Components
import { Link } from 'react-router-dom';
import Message from '../../components/Message';

// Redux
import { register, reset } from '../../slices/authSlice';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // permite utilizarmos funções do redux que definimos no slice
    const dispatch = useDispatch();

    const { loading, error } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            name,
            email,
            password,
        }
        dispatch(register(user));
        }
    // clean all states
    useEffect(() => {
        dispatch(reset());  
      }, [dispatch]);

    return (
        <div id="register">
            <h2>InstaFake</h2>
            <p className="subtitle">Registe-se</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name || ""}
                />
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
                {!loading && <input type="submit" value="login" />}
                {loading && <input type="submit" value="aguarde..." disabled/>}
                {error && <Message msg={error} type="error" />}

            </form>
            <p>
                Já tem conta? <Link to="/account/login">Clique Aqui</Link>
            </p>
        </div>
    )
}

export default Register