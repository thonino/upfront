import "./App.css";
import { Routes, Route } from "react-router-dom";
import Products from "./components/Products/Products";
import ProductForm from "./components/ProductForm/ProductForm";
import NotFound from "./components/NotFound/NotFound";
import EditProduct from "./components/EditProduct/EditProduct";
import DeleteProduct from "./components/DeleteProduct/DeleteProduct";
import Login from "./components/Login/Login";
import Navbar from "./components/Nav/Nav";
import { AuthProvider } from "./components/AuthContext/AuthContext";
import Register from "./components/Register/Register";
import Basket from "./components/Basket/Baskect";
import Order from "./components/Order/Order";
import PayementSuccess from "./components/PayementSuccess/PayementSuccess";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/new" element={<ProductForm />} />
          <Route path="/product/edit/:id" element={<EditProduct />} />
          <Route path="/product/delete/:id" element={<DeleteProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/order/:basketId" element={<Order />}  />
          <Route path="/payementsuccess/:invoiceid" element={<PayementSuccess/>}  />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
