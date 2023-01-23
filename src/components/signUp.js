import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import axios from "axios";
import {AuthContext} from '../contexts/auth.js'


export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {REACT_APP_API_URL} = useContext(AuthContext);


    async function signUp() {
        const user = {
            name,
            email,
            password,
            confirmPassword
        }
        if (password === confirmPassword)
            try {
                const response = await axios.post(`${REACT_APP_API_URL}/signUp`, user);
                console.log(response);
                navigate('/');
            }
            catch (error) {
                console.log(error.response.data);
                setError(error.response.data);
            }
        else {
            setError('Senhas diferentes');
        }
    }
    return (
        <Wrapper>
            <h1>MyWallet</h1>
            <input data-test="name" type='text' onChange={(event) => setName(event.target.value) } placeholder='Nome'></input>
            <input data-test="email" type='email' onChange={(event) => setEmail(event.target.value)} placeholder='E-mail'></input>
            <input data-test="password" type='password' onChange={(event) => setPassword(event.target.value)} placeholder='Senha'></input>
            <input data-test="conf-password" type='password' onChange={(event) => setConfirmPassword(event.target.value)} placeholder='Confirme a senha'></input>
            <div>{error}</div>
            <button data-test="sign-up-submit" onClick={signUp}>Cadastrar</button>
            <Link to='/'>Já tem uma conta? Entre agora!</Link>
        </Wrapper>
    )

}

const Wrapper = styled.div`
    background-color: #8C11BE;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    h1{
        font-family: 'Saira Stencil One';
        font-weight: normal;
        font-size: 32px;
        color:white;
        margin-bottom: 25px;
    }
    input{
        height: 60px;
        width: 80vw;
        border-radius: 5px;
        background-color: #FFF;
        border: 1px solid;
        margin-bottom: 15px;
    }
    input::placeholder{
        font-family: 'Raleway';
        color:#000;
        padding-left: 10px;
        font-size: 20px;
    }
    button{
        background-color: #A328D6;
        font-family: 'Raleway';
        color: #FFF;
        font-size: 20px;
        font-weight: bold;
        width: 80vw;
        height: 50px;
        border: none;
        border-radius: 5px;
    }
    a{
        margin-top: 35px;
        font-size: 15px;
        font-weight: bold;
        font-family: 'Raleway';
        color: #FFF;
        text-decoration: none;
    }
    div{
        font-size: 20px;
        margin-bottom: 10px;
        font-family: 'Raleway';
    }
`