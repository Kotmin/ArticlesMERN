import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ArticlesPage from './pages/ArticlesPage';
import CategoriesPage from './pages/CategoriesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
    const [auth, setAuth] = useState(!!localStorage.getItem('token'));
    
  return (
    <Router>
      <Switch>
        <Route path="/articles" component={ArticlesPage} />
        <Route path="/articles/:id" component={ArticleDetailPage} />
        <Route path="/categories" component={CategoriesPage} />
        <Route path="/create-category" component={CreateCategory} />
        <Route path="/create-article" component={CreateArticle} />
        {/* <Route path="/login" component={LoginPage} /> */}
        <Route path="/register" component={RegisterPage} />
        <Route path="/login">
          <Login setAuth={setAuth} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
