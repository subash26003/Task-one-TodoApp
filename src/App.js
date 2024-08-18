
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from "./Pages/HomePage/Home"
import Card from './Component/Card/Card';
import EditCard from './Pages/EditPage/EditCard';
import 'bootstrap/dist/css/bootstrap.min.css'
import AddTask from './Component/AddTask/AddTask';
import AdminVerification from './Component/AdminVerification/AdminVerification';
import { DarkModeProvider } from './Component/DarkModeProvider/DarkModeProvider';
import PopUp from './Component/popUp/PopUp';

function App() {

  return (
    <div>
        <DarkModeProvider>
          <Routes>
            <Route path="/" element={<HomePage />}>
              <Route path="/card" element={<Card />} />
              <Route path="/verify" element={<AdminVerification />} /> 
            </Route>
            
            <Route path="/edit" element={<EditCard />} />
            <Route path="/add" element={<AddTask />} />
            
          </Routes>
        </DarkModeProvider>
    </div>
  );
}

export default App;
