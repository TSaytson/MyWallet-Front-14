import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ResetCss } from './ResetCss'
import SignIn from './pages/signIn'
import SignUp from './pages/signUp'
import Registry from './pages/registry';
import Transaction from './pages/transaction'
import AuthProvider from './contexts/auth.jsx';


function App() {

  return (
    <BrowserRouter>
      <ResetCss />
      <AuthProvider>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/Sign-Up' element={<SignUp />} />
        <Route path='/Registry' element={<Registry />} />
        <Route path='/Transaction' element={<Transaction />}/>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App
