import Login from "./components/Login";
import Signup from './components/Signup';
import Home from "./components/Home";
import Laptop from "./components/Laptop";
import Mobile from "./components/Mobile";
import Cart from './components/Cart';
import Orders from "./components/Orders";
import Returns from "./components/Returns";
import Help from "./components/Help";
import "./App.css";
import {Routes,Route} from 'react-router-dom';
import {UserAuthContextProvider} from "./context/UserAuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div>
      <UserAuthContextProvider>
      <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/home' element={<PrivateRoute><Home/></PrivateRoute>} />
      <Route path='/mobile' element={<PrivateRoute><Mobile/></PrivateRoute>} />
      <Route path='/laptop' element={<PrivateRoute><Laptop/></PrivateRoute>} />
      <Route path='/cart' element={<PrivateRoute><Cart/></PrivateRoute>} />
      <Route path='/orders' element={<PrivateRoute><Orders/></PrivateRoute>} />
      <Route path='/returns' element={<PrivateRoute><Returns/></PrivateRoute>} />
      <Route path='/help' element={<PrivateRoute><Help/></PrivateRoute>} />
      </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
