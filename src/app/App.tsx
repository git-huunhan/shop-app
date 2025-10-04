import { Routes, Route } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Products from "@/features/product/components/Products";
import ProductDetail from "@/features/product/components/ProductDetail";
import Cart from "@/features/cart/components/Cart";
import Login from "@/features/auth/components/LoginForm";
import SignUp from "@/features/auth/components/SignUpForm";
import ProtectedRoute from "@/components/ProtectedRoute";

function Home() {
  return <h2>Home Page</h2>;
}

function App() {
  return (
    <>
      <div>
        <NavBar />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
