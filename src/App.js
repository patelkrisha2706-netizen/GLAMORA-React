import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Admin components
import AdminLogin from './admin/AdminLogin';
import AdminRegister from './admin/AdminRegister';
import Sidebar from './admin/Sidebar';
import CreateCategory from './admin/CreateCategory';
import ReadCategory from './admin/ReadCategory';
import UpdateCategory from './admin/UpdateCategory';
import CreateProduct from './admin/CreateProduct';
import ReadProduct from './admin/ReadProduct';
import UpdateProduct from './admin/UpdateProduct';
import ManageUser from './admin/ManageUser';
import FeedbackList from './admin/ManageFeedback';
import ManageOrder from './admin/ManageOrder';
import AdminForgotPassword from './admin/AdminForgotPassword';

// User components
import HomePage from './pages/HomePage';
import ProductDetails from './pages/ProductDetails';
import UserRegister from './pages/UserRegister';
import UserLogin from './pages/UserLogin';
import AddToCart from './pages/AddToCart';
import CheckOut from './pages/CheckOut';
import MyOrder from './pages/MyOrder';
import Necklace from './pages/Necklace';
import Rings from './pages/Rings';
import Earrings from './pages/Earrings';
import AboutUs from './pages/AboutUs';
import Mens from './pages/Mens';
import Bracelets from './pages/Bracelets';
import ContactUs from './pages/ContactUs';
import Wishlist from './pages/Wishlist';
import UserProfile from './pages/UserProfile';
import UserLogout from './pages/UserLogout';
function App() {
  const [admin, setAdmin] = useState(null);

  const getSavedUser = () => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  };

  const [user, setUser] = useState(getSavedUser);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <div className="d-flex flex-grow-1">

          {/* Sidebar visible only if admin is logged in */}
          {admin && <Sidebar admin={admin} setAdmin={setAdmin} />}

          <div className="flex-grow-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/user-register" element={<UserRegister />} />
              <Route path="/user-login" element={<UserLogin setUser={setUser} />} />
              <Route path="/necklace" element={<Necklace />} />
              <Route path="/rings" element={<Rings />} />
              <Route path="/earrings" element={<Earrings />} />
              <Route path="/bracelets" element={<Bracelets />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/mens" element={<Mens />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/logout" element={<UserLogout />} />

              {/* User Protected Routes */}
              <Route
                path="/addtocart"
                element={user ? <AddToCart /> : <Navigate to="/user-login" />}
              />
              <Route
                path="/checkout"
                element={user ? <CheckOut /> : <Navigate to="/user-login" />}
              />
              <Route
                path="/myorder"
                element={user ? <MyOrder /> : <Navigate to="/user-login" />}
              />


              {/* Admin Routes */}
              <Route path="/register" element={<AdminRegister />} />
              <Route path="/login" element={<AdminLogin setAdmin={setAdmin} />} />
              <Route path='/admin-forgot-password' element={<AdminForgotPassword/>}/>
              {admin && (
                <>
                  <Route path="/home" element={<ReadCategory />} />
                  <Route path="/insert" element={<CreateCategory />} />
                  <Route path="/update/:id" element={<UpdateCategory />} />
                  <Route path="/products/add" element={<CreateProduct />} />
                  <Route path="/products/edit/:id" element={<UpdateProduct />} />
                  <Route path="/products/read" element={<ReadProduct />} />
                  <Route path='/manage-user' element={<ManageUser />} />
                  <Route path='/manage-feedback' element={<FeedbackList />} />
                  <Route path='/manage-order' element={<ManageOrder/>} />
                </>
              )}

              {/* Fallback */}
              <Route
                path="*"
                element={<Navigate to={admin ? "/home" : "/"} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
