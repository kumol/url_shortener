import './App.css';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Layout from './components/layouts/Layout.jsx';
import Dashboard from './components/containers/Dashboard/Dashboard.jsx';
import LogIn from './components/containers/User/LogIn/LogIn.jsx';
import Register from './components/containers/User/Register/Register.jsx';
import UrlShortner from './components/containers/UrlShortner/UrlShortner.jsx';
import AuthGuard from './components/layouts/AuthGuard.jsx';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthGuard><Layout><UrlShortner/></Layout></AuthGuard>}></Route>
          <Route path='/user/login' element={<Layout><LogIn/></Layout>} />
          <Route path='/user/signup' element={<Layout><Register/></Layout>} />
          <Route path="/dashboard" element={<AuthGuard><Layout><Dashboard/></Layout></AuthGuard>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
