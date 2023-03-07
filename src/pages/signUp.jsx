import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import axios from "axios";
import { AuthContext } from '../contexts/auth.jsx'
import { ThreeDots } from "react-loader-spinner";
import swal from "sweetalert";


export default function SignUp() {

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { API_URL } = useContext(AuthContext);
    const [clicked, setClicked] = useState(false);


    async function signUp(e) {
        e.preventDefault();

        if (form.password === form.confirmPassword)
            try {
                setClicked(true);
                const response = await axios.post(`${API_URL}/signUp`, form);
                navigate('/', { state: response.data });
            }
            catch (error) {
                setClicked(false);
                console.log(error.response.data);
                swal({
                    title: "Erro!",
                    text: error.response.data,
                    icon: "error"});
                setError(error.response.data);
            }
        else {
            swal({
                title: "Erro!",
                text:'Senhas diferentes',
                icon: "error"});
        }
    }
    function handleForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <Wrapper>
            <h1>MyWallet</h1>
            <Form onSubmit={signUp}>
                <input data-test="name"
                    name="name"
                    type='text'
                    onChange={handleForm}
                    value={form.name}
                    placeholder='Nome'
                    required />
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
                <input data-test="conf-password"
                    name="confirmPassword"
                    type='password'
                    onChange={handleForm}
                    value={form.confirmPassword}
                    placeholder='Confirme a senha'
                    required />
                <div>{error}</div>
                <button data-test="sign-up-submit" type="submit" disabled={clicked}>
                    {clicked ? <ThreeDots
                        color="#8415a0"
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
                        }} /> : 'Cadastrar'}</button>
            </Form>
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
        color:#000;
        padding-left: 2px;
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
        font-size: 20px;
        margin-bottom: 10px;
        font-family: 'Raleway';
    }
`