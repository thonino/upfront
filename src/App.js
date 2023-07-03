import './App.css';
import { Routes, Route } from "react-router-dom";
import  Products from './components/Products/Products'; 
import NotFound from './components/NotFound/NotFound';
import ProductForm from './components/ProductForm/ProductForm';
import Navbar from "./components/Nav/Nav";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product/new" element={<ProductForm />} />
        <Route path="*" element={<NotFound />} />
        {/* <Redirect to="/" /> */}
      </Routes>
    </div>
  );
}

export default App;