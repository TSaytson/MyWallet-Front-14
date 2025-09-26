import styled from "styled-components"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useContext, useState } from "react";
import { AuthContext } from '../contexts/auth.jsx'
import { ThreeDots } from "react-loader-spinner";
import swal from 'sweetalert2';
import { signIn } from "../services/authApi.js";
import { useEffect } from "react";

export default function SingIn() {
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState('');
    const { setUser } = useContext(AuthContext);
    const [clicked, setClicked] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setClicked(true);
            const { name, token } = await signIn(form);
            setUser({ name, token });
            localStorage.setItem('user',
                JSON.stringify({ name, token })
            );
            swal.fire({
                icon: 'info',
                toast: true,
                timer: 2000,
                position: 'top-right',
                showConfirmButton: false,
                title: `Welcome ${name}. We are delighted you're here`,
                footer: 'This is your registry'
            })
            navigate('/registry', { state: name });
        }
        catch (error) {
            setClicked(false);
            console.log(error);
            const errorMessage = error.response ?
                error.response.data.message :
            error.message
            swal.fire({
                title: "Erro!",
                text: errorMessage,
                icon: "error"
            })
            setError(errorMessage);
        }
    }

    function handleForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUser(user);
            navigate('/registry')
        }
    })

    return (
        <Wrapper>
            <h1>MyWallet</h1>
            <Form onSubmit={handleSubmit}>
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
                <div style={{ color: '#f02849' }}>
                    {location.state ? location.state : error}
                </div>
                <button type='submit' disabled={clicked}>
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