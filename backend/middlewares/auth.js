const jwt = require("jsonwebtoken");
require('dotenv').config();
const User = require("../models/User");
const jwtSecret = process.env.SECRET;

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({ error: "No token provided" })
    }
    const parts = authHeader.split(" ");
    if (!parts.length === 2) {
        return res.status(401).json({ error: "Token error" })
    }
    // separa a string em dois o "Bearer" e o "token"
    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ error: "Token malformatted" })
    }
    // verifica se o token é válido através do token e da chave de criação
    // Se o token não for válido cai if com o err
    // Se for válido, podemos pegar o id do usuário via o parametro decoded 
    // Por fim, chamamos a função next() que permite a execução seguir para o próximo middleware ou rota
    try {
        const verified = jwt.verify(token, jwtSecret);
        req.user = await User.findById(verified.id).select("-password");
        return next();
    } catch (error) {
        return res.status(401).json({ err: "token invalid" });
    }
    // jwt.verify(token, process.env.SECRET, (err, decoded) => {
    //     if (err) return res.status(401).json({ err: "token invalid" });
    //     req.userId = decoded.id;
    //     return next();
    // });
}

module.exports = auth;
