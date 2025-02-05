import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './component/LoginPage';
import RegisterPage from './component/Register';
import AccountPage from './component/AccountPage';
import WelcomePage from './component/WelcomePage';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage username={user?.username} />} />
          <Route path="/welcome" element={<WelcomePage username={user?.username} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
