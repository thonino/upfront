import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Nav/Nav.js";
import CookieConsent from "./components/CookieConsent/CookieConsent.js";
import Footer from './components/Footer/Footer.js';
import Home from "./components/Home/Home.js";
import About from "./components/About/About.js";
import Products from "./components/Products/Products.js";
import ProductForm from "./components/ProductForm/ProductForm.js";
import EditProduct from "./components/EditProduct/EditProduct.js";
import Register from "./components/Register/Register.js";
import Login from "./components/Login/Login.js";
import { AuthProvider } from "./components/AuthContext/AuthContext.js";
import { CartProvider } from "./components/CartContext/CartContext.js";
import { MessageProvider } from "./components/MessageContext/MessageContext.js";
import MessageForm from "./components/MessageForm/MessageForm.js";
import MessageReceived from "./components/MessageReceived/MessageReceived.js";
import MessageSent from "./components/MessageSent/MessageSent.js";
import Basket from "./components/Basket/Basket.js";
import Order from "./components/Order/Order.js";
import PayementSuccess from "./components/PayementSuccess/PayementSuccess.js";
import NotFound from "./components/NotFound/NotFound.js";
import LegalMentions from "./components/LegalMentions/LegalMentions.js";
import Confidentiality from "./components/Confidentiality/Confidentiality.js";
import CGV from "./components/CGV/CGV.js";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.js";
import Account from "./components/Account/Account.js";
import AccountEdit from "./components/AccountEdit/AccountEdit.js";

function App() {
  return (
    <div className="my-container sb-fix">
      <AuthProvider>
        <CartProvider>
          <MessageProvider>
            <Navbar />
            <CookieConsent />
              <Routes>
              <Route path="/account" element={<Account />} />
                <Route path="/account/edit/:id" element={<AccountEdit />} />
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
          </MessageProvider>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}
export default App;