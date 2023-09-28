import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Nav/Nav";
import CookieConsent from "./components/CookieConsent/CookieConsent";
import Footer from './components/Footer/Footer';
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Products from "./components/Products/Products";
import ProductForm from "./components/ProductForm/ProductForm";
import EditProduct from "./components/EditProduct/EditProduct";
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
import LegalMentions from "./components/LegalMentions/LegalMentions";
import Confidentiality from "./components/Confidentiality/Confidentiality";
import CGV from "./components/CGV/CGV";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <div className="my-container sb-fix">
      <AuthProvider>
        <Navbar />
        <CookieConsent />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/new" element={<ProductForm />} />
            <Route path="/product/edit/:id" element={<EditProduct />} />
            <Route path="/category/:category" element={<Products />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/order/:basketId" element={<Order />}  />
            <Route path="/payementsuccess/:invoiceid" element={<PayementSuccess/>}  />
            <Route path="/messageform" element={<PrivateRoute><MessageForm /></PrivateRoute>} /> 
            <Route path="/messagereceived" element={<PrivateRoute><MessageReceived/></PrivateRoute>} />
            <Route path="/messagesent" element={<PrivateRoute><MessageSent/></PrivateRoute>} /> 
            <Route path="/legalMentions" element={<LegalMentions/>} /> 
            <Route path="/confidentiality" element={<Confidentiality/>} /> 
            <Route path="/cgv" element={<CGV/>} /> 
            <Route path="*" element={<NotFound />} />
        </Routes>
      <Footer/>
      </AuthProvider>
    </div>
  );
}

export default App;
