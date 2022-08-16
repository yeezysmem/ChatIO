import './App.css';
import BrowserRouter from "react-router-dom/BrowserRouter";
import { Navbar } from './components/Navbar';

export const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  )
}
