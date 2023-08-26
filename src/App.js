import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Nav/Nav";
import Products from "./components/Products/Products";
import ProductForm from "./components/ProductForm/ProductForm";
import EditProduct from "./components/EditProduct/EditProduct";
import DeleteProduct from "./components/DeleteProduct/DeleteProduct";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import { AuthProvider } from "./components/AuthContext/AuthContext";
import MessageForm from "./components/MessageForm/MessageForm";
import MessageReceived from "./components/MessageReceived/MessageReceived";
import MessageSent from "./components/MessageSent/MessageSent";
import Basket from "./components/Basket/Basket";
import Order from "./components/Order/Order";
import PayementSuccess from "./components/PayementSuccess/PayementSuccess";
import NotFound from "./components/NotFound/NotFound";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

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
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/order/:basketId" element={<Order />}  />
          <Route path="/payementsuccess/:invoiceid" element={<PayementSuccess/>}  />
          <Route path="/messageform" element={<PrivateRoute><MessageForm /></PrivateRoute>} />
          <Route path="/messagereceived" element={<PrivateRoute><MessageReceived/></PrivateRoute>} />
          <Route path="/messageform" element={<PrivateRoute><MessageForm /></PrivateRoute>} />
          <Route path="/messagereceived" element={<PrivateRoute><MessageReceived/></PrivateRoute>} />
          <Route path="/messagesent" element={<PrivateRoute><MessageSent/></PrivateRoute>} />
          <Route path="*" element={<NotFound />} />
      </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
