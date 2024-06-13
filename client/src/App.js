
// This is a React Router v6 app
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import ThemeToggle from './components/ThemeToggle';


import Home from './components/Home';

import Register from './components/Register';
import Login from './components/Login';
import Users from './components/Users';

import AddArticle from './components/AddArticle';

 

function App() {
  return (
    <div className="App">

    <ThemeToggle />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/addarticle" element={<AddArticle />} />
        {/* <Route path="users/*" element={<Users />} /> */}
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

// function Users() {
//   return (
//     <div>
//       <nav>
//         <Link to="me">My Profile</Link>
//       </nav>

//       <Routes>
//         <Route path=":id" element={<UserProfile />} />
//         <Route path="me" element={<OwnUserProfile />} />
//       </Routes>
//     </div>
//   );
// }