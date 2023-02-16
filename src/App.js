import "./App.css";
import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Error from './components/Error';
import Login from './components/Login';
import Signup from './components/Signup';
import Projectdetail from './components/Projectdetail';
import Allprojects from './components/Allprojects';
import Userprofile from "./components/Userprofile";
import Usercontact from "./components/Usercontact";
import CreateAProject from "./components/CreateAProject";

function App() {
  return (
  <>
  <Header />
  <div className="components">
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/404' element={<Error />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      <Route path='/projects' element={<Allprojects />}></Route>
      <Route path='/projects/:_id' element={<Projectdetail />}></Route>
      <Route path='/createproject' element={<CreateAProject />}></Route>
      <Route path='/user/:id' element={<Userprofile />}></Route>
      <Route path='/user/:id/contact' element={<Usercontact />}></Route>
    </Routes>
  </div>
  <Footer />
  </>
  );
}

export default App;
