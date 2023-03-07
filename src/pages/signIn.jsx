import styled from "styled-components"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from '../contexts/auth.jsx'
import { ThreeDots } from "react-loader-spinner";
import swal from 'sweetalert';

export default function SingIn() {
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState('');
    const { setName, setToken, API_URL } = useContext(AuthContext);
    const [clicked, setClicked] = useState(false);

    async function signIn(e) {
        e.preventDefault();
        
        try {
            setClicked(true);
            const response = await axios.post(`${API_URL}/signIn`, form);
            setToken(response.data.token);
            setName(response.data.name);
            navigate('/registry', { state: response.data.name });
        }
        catch (error) {
            setClicked(false);
            console.log(error.response.data);
            swal({
                title: "Erro!",
                text: error.response.data[0] ? 
                error.response.data[0] : error.response.data.message,
                icon: "error"
            })
            setError(error.response.data.message ? error.response.data.message : error.response.data);
        }
    }

    function handleForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    return (
        <Wrapper>
            <h1>MyWallet</h1>
            <Form onSubmit={signIn}>
                <input data-test="email"
                    name="email"
                    type='email'
                    onChange={handleForm}
                    value={form.email}
                    placeholder='E-mail'
                    required />
                <input data-test="password"
                    name="password"
                    type='password'
                    onChange={handleForm}
                    value={form.password}
                    placeholder='Senha'
                    required />
                <div>{location.state ? location.state : error}</div>
                <button data-test="sign-in-submit" type='submit' disabled={clicked}>
                    {clicked ? (<ThreeDots
                        color="#8415a0"
                        radius="9"
                        wrapperStyle={{
                            display: clicked ? 'flex' : 'none',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#A328D6',
                            fontFamily: 'Raleway',
                            fontSize: 'x-large',
                            fontWeight: 'bold',
                            width: '79vw',
                            height: '50px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }} />) : 'Entrar'}</button>
            </Form>

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
    
    a{
        margin-top: 35px;
        font-size: 15px;
        font-weight: bold;
        font-family: 'Raleway';
        color: #FFF;
        text-decoration: none;
    }
    
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    div{
        margin-bottom: 10px;
        font-size: 20px;
        font-family: 'Raleway';
    }
`