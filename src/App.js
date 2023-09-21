import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './views/Home';
import SignUp from './views/SignUp';
import Login from './views/Login';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
