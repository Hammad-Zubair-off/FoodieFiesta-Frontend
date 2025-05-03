import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homescreen from "./screens/Homescreen";
import Loginscreen from "./screens/Loginscreen";
import Registerscreen from "./screens/Registerscreen";
import Cartscreen from "./screens/Cartscreen";
import ProfileScreen from "./screens/ProfileScreen";
import AdminDashboard from "./screens/AdminDashboard";
import AdminLogin from "./screens/AdminLogin";
import NotFoundScreen from "./screens/NotFoundScreen";
import SuccessScreen from "./screens/SuccessScreen";
import OrdersScreen from "./screens/OrdersScreen";
import MenuScreen from "./screens/MenuScreen";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductList from "./screens/ProductList";
import EditProduct from "./screens/EditProduct";
import AddProduct from "./screens/AddProduct";
import UserManagement from "./screens/UserManagement";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Homescreen />} />
          <Route path="/menu" element={<MenuScreen />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Loginscreen />} />
          <Route path="/register" element={<Registerscreen />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/success" element={<SuccessScreen />} />
          <Route path="/cart" element={<Cartscreen />} />
          <Route path="/orders" element={<OrdersScreen />} />

          {/* Protected User Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfileScreen />} />
          </Route>

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute requireAdmin={true} />}>
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/productList" element={<ProductList />} />
            <Route path="/edit" element={<EditProduct />} />
            <Route path="/add" element={<AddProduct />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </main>
      <Footer />
    </AuthProvider>
  );
}

export default App;
