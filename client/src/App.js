// import logo from './logo.svg';
import './App.css';
import SignIn from './Components/signin';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Components/signup';
import Home from './Components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import View from './Components/view';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' Component={SignIn} />
          <Route path='/signup' Component={SignUp} />
          <Route path='/home' Component={Home} />
          <Route path='/view' Component={View} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
