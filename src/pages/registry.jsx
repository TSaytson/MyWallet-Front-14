import axios from "axios";
import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from '../contexts/auth.jsx'
import TopBar from "../components/TopBar.jsx";
import { getTransactions } from "../services/transactionApi.js";
import Swal from "sweetalert2";


export default function Registry() {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const { user, setUser } = useContext(AuthContext);

    let balance = 0;

    async function fetchTransactions() {
        try {
            const response = await getTransactions(user.token);
            console.log(response);
            setTransactions(response);
        } catch (error) {
            if (error.response.data.message === 'Invalid token') {
                localStorage.removeItem('user');
                navigate('/')
            }
            Swal.fire({
                title: 'Error',
                icon: 'error',
                toast: true,
                position: 'top-right',
                text: `Failed to get transactions`
            })
        }
    }

    transactions.forEach((entry) => {
        {
            entry.type === 'withdraw' ?
                balance -= Number(entry.value) : balance += Number(entry.value)
        }
    });

    async function deleteEntry(id) {
        if (window.confirm('Excluir?')) {
            const headers = { "authorization": `Bearer ${user.token}` }
            try {
                const response = await axios.delete(`${API_URL}/transactions/${id}`, { headers });
                console.log(response.data);
                fetchTransactions();
            } catch (error) {
                console.log(error);
            }
        }
    }
    useEffect(() => {
        const localUser = JSON.parse(localStorage.getItem('user'));
        if (!user || !localUser) navigate('/')
        fetchTransactions();
    }, []);

    return (
        <Wrapper>
            <TopBar />
            <Entries hasEntries={transactions.length} balance={balance}>
                {transactions.length ?
                    transactions.map((entry, index) =>
                        <Entry type={entry.type} key={index}>
                            <div>
                                <p>
                                    {entry.date.substr(8, 2)}/{entry.date.substr(5, 2)}/{entry.date.substr(2, 2)}
                                </p>
                                <p>{entry.description}</p>
                            </div>
                            <div>
                                <p>R${entry.value.toString().replaceAll('.', ',')}</p>
                                <ion-icon name="close-circle-outline"
                                    onClick={() => deleteEntry(entry._id)}>
                                </ion-icon>
                            </div>
                        </Entry>)
                    : 'Não há registro de entrada ou saída'}
                {(!transactions.length) ||
                    <div>
                        <p>SALDO</p>
                        <p>R${balance}</p>
                    </div>
                }
            </Entries>
            <Bottom>
                <div onClick={() => navigate('/transaction', { state: ['entry', user.token] })}>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <p>Nova entrada</p>
                </div>
                <div onClick={() => navigate('/transaction', { state: ['withdraw', user.token] })}>
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
            color:${(props) => props.balance >= 0 ? '#03AC00' : 'red'};
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