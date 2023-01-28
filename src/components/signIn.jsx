import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from '../contexts/auth.jsx'
import { ThreeDots } from "react-loader-spinner";

export default function SingIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setName, setToken, REACT_APP_API_URL } = useContext(AuthContext);
    const [clicked, setClicked] = useState(false);
    async function signIn() {
        const user = {
            email,
            password
        }
        try {
            setClicked(true);
            const response = await axios.post(`${REACT_APP_API_URL}/signIn`, user);
            console.log(response);
            setToken(response.data.token);
            setName(response.data.name);
            navigate('/registry', { state: response.data.name });
        }
        catch (error) {
            setClicked(false);
            console.log(error.response.data);
            setError(error.response.data);
        }
    }

    return (
        <Wrapper clicked={clicked}>
            <h1>MyWallet</h1>
            <input data-test="email" type='email' required onChange={(event) => setEmail(event.target.value)} placeholder='E-mail'></input>
            <input data-test="password" type='password' onChange={(event) => setPassword(event.target.value)} placeholder='Senha'></input>
            <div>{error}</div>
            <button data-test="sign-in-submit" onClick={signIn}>Entrar</button>
            <ThreeDots onClick={signIn} 
                height="50"
                width="80"
                radius="9"
                color="#8415a0"
                ariaLabel="three-dots-loading"
                wrapperStyle={{
                    display: clicked ? 'flex' : 'none',
                    justifyContent: 'center',
                    backgroundColor: '#A328D6',
                    fontFamily: 'Raleway',
                    fontSize: 'x-large',
                    fontWeight: 'bold',
                    width: '80vw',
                    height: '50px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
                wrapperClassName=""/>
            <Link to={'/sign-up'}>Primeira vez? Cadastre-se</Link>
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
        padding-left: 10px;
        height: 60px;
        width: 80vw;
        border-radius: 5px;
        background-color: #FFF;
        border: 1px solid;
        margin-bottom: 15px;
    }
    input::placeholder{
        font-family: 'Raleway';
        padding-left: 2px;
        color:#000;
        font-size: 20px;
    }
    button{
        display: ${props => props.clicked ? 'none' : 'block'} ;
        background-color: #A328D6;
        font-family: 'Raleway';
        color: #FFF;
        font-size: 20px;
        font-weight: bold;
        width: 80vw;
        height: 50px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
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
        margin-bottom: 10px;
        font-size: 20px;
        font-family: 'Raleway';
    }
`