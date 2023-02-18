import axios from "axios";
import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from '../contexts/auth.jsx'


export default function Registry() {
    const navigate = useNavigate();
    const [entries, setEntries] = useState([]);
    const { name, token, setToken, API_URL } = useContext(AuthContext);

    let balance = 0;
    entries.forEach((entry) => {
        {
            entry.type === 'withdraw' ?
                balance -= Number(entry.value) : balance += Number(entry.value)
        }
    });
    async function getEntries() {
        const headers = {
            "authorization": `Bearer ${token}`
        }
        try {
            const response = await axios.get(`${API_URL}/transactions`, {headers});
            console.log(response.data);
            setEntries(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    async function deleteEntry(id) {
        if (window.confirm('Excluir?')) {
            const headers = { "authorization": `Bearer ${token}` }
            try {
                const response = await axios.delete(`${API_URL}/transactions/${id}`, {headers});
                console.log(response.data);
                getEntries();
            } catch (error) {
                console.log(error);
            }
        }
    }
    useEffect(() => {
        getEntries();
    }, []);

    return (
        <Wrapper>
            <div>
                <h1 data-test="user-name">Olá, {name}</h1>
                <ion-icon data-test="logout" name="log-out-outline" onClick={() => {
                    setToken(null);
                    navigate('/')
                }}></ion-icon>
            </div>
            <Entries hasEntries={entries.length} balance={balance}>
                {(entries.length === 0) ?
                    'Não há registro de entrada ou saída' : entries.map((entry, index) =>
                        <Entry type={entry.type} key={index}>
                            <div>
                                <p>{entry.date.substr(8,2)}/{entry.date.substr(5,2)}/{entry.date.substr(2,2)}</p>
                                <p>{entry.description}</p>
                            </div>
                            <div>
                                <p>R${entry.value.toString().replaceAll('.', ',')}</p>
                                <ion-icon onClick={() => deleteEntry(entry._id)} name="close-circle-outline"></ion-icon>
                            </div>
                        </Entry>
                    )}
                <div>
                    {(entries.length) ?
                        <>
                            <p>SALDO</p>
                            <p>R${balance}</p>
                        </>
                        : ''
                    }
                </div>
            </Entries>
            <Bottom>
                <div onClick={() => navigate('/transaction', { state: ['entry', token] })}>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <p>Nova entrada</p>
                </div>
                <div onClick={() => navigate('/transaction', { state: ['withdraw', token] })}>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <p>Nova saída</p>
                </div>
            </Bottom>
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
    > div{
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
        }
        ion-icon{
            font-size:25px ;
            color: #fff;
            cursor: pointer;
        }
    }
`
const Entries = styled.main`
    position: relative;
    background-color: #fff;
    border-radius: 5px;
    width: 80vw;
    height: 65vh;
    display: flex;
    flex-direction: column;
    justify-content: ${(props) => (props.hasEntries) ? 'flex-start' : 'center'};
    align-items: ${(props) => (props.hasEntries) ? 'space-between' : 'center'};
    text-align: center;
    font-family: 'Raleway';
    font-size: 20px;
    color: #868686;
    margin-bottom: 65px;
    p{
        margin: 2px 10px;
    }
    > div{
        position: absolute;
        bottom: 10px;
        left: 0;
        display: flex;
        width: 80vw;
        justify-content: space-between;
        p:nth-child(1){
            color: black;
            font-size: 17px;
            font-weight: bold;
        }
        p:nth-child(2){
            color:#03AC00;
            font-size: 17px;
        }

    }
`
const Entry = styled.ul`
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    div{
        display: flex;
        p{
            font-size: 16px;
            font-family: 'Raleway';
        }
        p:nth-child(1){
            color: #C6C6C6;
        }
        p:nth-child(2){
            color:black;
            margin-left: 0px;
        }
    }
    div:nth-child(2){
        p{
            color: ${(props) => (props.type) === 'entry' ? '#03AC00' : 'red'};
            font-size: 16px;
            font-family: 'Raleway';        
        }
    }
    ion-icon{
        margin-right: 10px;
        cursor: pointer;
    }
`
const Bottom = styled.div`
    display: flex;
    width: 80vw;
    div{
        box-sizing: border-box;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        border-radius: 5px;
        width: 48%;
        height:115px;
        background-color: #A328D6;
        cursor:pointer;
        p{
            width: 40px;
            color: #fff;
            font-family: 'Raleway';
            font-size: 17px;
            font-weight: bold;
        }
    }
`