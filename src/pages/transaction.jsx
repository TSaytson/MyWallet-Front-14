import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert2";
import { AuthContext } from '../contexts/auth.jsx';
import { createTransaction } from "../services/transactionApi.js";


export default function Transaction() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const [form, setForm] = useState({
        value: 0,
        description: '',
        date: new Date().toLocaleString().split(',')[0]
    })
    const [error, setError] = useState('');

    async function saveTransaction(e) {
        e.preventDefault();
        const transaction = {
            ...form,
            type: location.state[0]
        }
        console.log(transaction);

        try {
            const response = await createTransaction(transaction, user.token);
            swal.fire({
                icon: 'success',
                text: `${response.message}`,
                toast: true,
                showConfirmButton: false,
                position: 'top-right',
                timer: 2000
            })
            navigate('/registry');
        }
        catch (error) {
            console.log(error);
            setError(error.response.data[0]);
        }
    }

    function handleForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        const localUser = JSON.parse(localStorage.getItem('user'));
        if (!localUser || !user) navigate('/')
    })

    return (
        <Wrapper>
            <div>
                <h1>Nova {location.state[0] === 'entry' ? 'entrada' : 'saída'}</h1>
            </div>
            <StyledForm onSubmit={saveTransaction} error={error}>
                <label htmlFor="value"></label>
                <input
                    required
                    id="value"
                    name="value"
                    onChange={handleForm}
                    type='number'
                    min='1'
                    placeholder="Valor"
                />
                <label htmlFor="description"></label>
                <input
                    required
                    id="description"
                    name="description"
                    onChange={handleForm}
                    type='text'
                    placeholder="Descrição"
                />
                <label htmlFor="date"></label>
                <input
                    id="date"
                    name="date"
                    onChange={handleForm}
                    type='date'
                    min='2025-01-01'
                />
                <button type='submit'>Salvar {location.state[0] === 'entry' ? 'entrada' : 'saída'}</button>
                <div>{error}</div>
            </StyledForm>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color: #8C11BE;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100vw;
    height: 100vh;
    >div{
        margin-top: 30px;
        height: 30px;
        width: 80vw;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        h1{
            font-family: 'Raleway';
            font-size: 26px;
            font-weight: bold;
            color: #fff;
            margin-bottom: 10px;
        }
    }    

`
const StyledForm = styled.form`
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
        display: ${(props) => props.error ? 'block' : 'none'};
        font-family: 'Raleway';
        font-size: 18px;
        color: #fa0a0a;
        margin-top: 10px;
    }
`