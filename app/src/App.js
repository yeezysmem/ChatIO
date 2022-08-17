import './App.css';
import { BrowserRouter } from "react-router-dom";
import AppRouter from './AppRouter';
import Navbar from './components/Navbar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import Loader from './components/Loader';

const App = () => {
  const auth = getAuth()
  const [user, loading, error] = useAuthState(auth)
  
  if (loading) {
    return <Loader />
  }

  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  )
}

export default App;
