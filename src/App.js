
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Screens/Login/Login';
import Dashboard from './Components/Screens/Dashboard/Dashboard';
import UsersList from './Components/Screens/UsersList/UsersList';
import SubscriptionPlans from './Components/Screens/SubscriptionPlans/SubscriptionPlans';
import AddTemplate from './Components/Screens/Dashboard/AddTemplate';


function App() {
  return (

    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-template" element={<AddTemplate />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/plans" element={<SubscriptionPlans />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
