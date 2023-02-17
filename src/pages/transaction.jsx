import axios from "axios";
import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components"
import {AuthContext} from '../contexts/auth.jsx'


export default function Transaction() {
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState({
        value: 0,
        description: '',
        date: null
    })
    const [error, setError] = useState('');
    const {token, API_URL} = useContext(AuthContext);

    async function saveTransaction(e) {
        e.preventDefault();
            const transaction = {
                ...form,
                type: location.state[0]
            }
            console.log(transaction);
            const headers = {'authorization': `Bearer ${token}`};

            try {
                const response = await axios
                    .post(`${API_URL}/transactions`, transaction, {headers});
                console.log(response);
                navigate('/registry');
            }
            catch (error) {
                console.log(error);
                setError(error.response.data);
            }
    }

    function handleForm(e){
        setForm({...form, [e.target.name] : e.target.value});
    }
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
            onChange={handleForm } 
            type='number'
            min='1'
            placeholder="Valor"
            />
            <label htmlFor="description"></label>
            <input 
            required
            id="description"
            name="description"
            onChange={ handleForm}
            type='text' 
            placeholder="Descrição"
            />
            <label htmlFor="date"></label>
            <input
            required
            id="date"
            name="date"
            onChange={handleForm}
            type='date'
            min='2023-01-01'
            max='2023-12-31'
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