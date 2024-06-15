
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

import RequireAuth from './components/RequireAuth';
import { AuthProvider } from "./utils/AuthContext"
import ProtectRoute from "./utils/ProtectRoute";

 

function App() {
  return (
    <div className="App">

    <ThemeToggle />
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/unauthorized" element={<h1>Unauthorized</h1>} />
        <Route element={<ProtectRoute />}>
          {/* Here we can add routes for regular user */}
          <Route element={<RequireAuth allowedRoles={["Regular","Admin"]} />}>
            <Route path="/addarticle" element={<AddArticle />} /> 
          </Route>

          <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
            <Route path="/users" element={<Users />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
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