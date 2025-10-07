import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Screens/Login/Login';
import Dashboard from './Components/Screens/Dashboard/Dashboard';
import UsersList from './Components/Screens/UsersList/UsersList';
import SubscriptionPlans from './Components/Screens/SubscriptionPlans/SubscriptionPlans';
import AddTemplate from './Components/Screens/Dashboard/AddTemplate';
import Categories from './Components/Screens/Categories/Categories';
import AddCategories from './Components/Screens/Categories/AddCategories';
import SubCategories from './Components/Screens/Categories/SubCategories';
import AddSubCategories from './Components/Screens/Categories/AddSubCategories';
import AddNewPlan from './Components/Screens/SubscriptionPlans/AddNewPlan';


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
          {/* <Route path="/add-plan" element={<AddNewPlan />} /> */}
          <Route path="/add-plan/:plan_id?" element={<AddNewPlan />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/add-category" element={<AddCategories />} />
          <Route path="/subcategories" element={<SubCategories />} />
          <Route path="/add-subcategory" element={<AddSubCategories />} />



        </Routes>
      </Router>
    </div>
  );
}

export default App;
