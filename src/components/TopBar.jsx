import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../contexts/auth";

export default function TopBar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  return (
    <StyledBar>
      <h1>Olá, {user?.name}</h1>
      <ion-icon name="log-out-outline" onClick={() => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/');
      }}></ion-icon>
    </StyledBar>
  )
}

const StyledBar = styled.div`
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
`