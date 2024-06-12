
// This is a React Router v6 app
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import ThemeToggle from './components/ThemeToggle';

import Register from './components/Register';

function App() {
  return (
    <div className="App">

    <ThemeToggle />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
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