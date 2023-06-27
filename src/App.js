import './App.css';
import { Routes, Route } from 'react-router-dom';
import { AllProducts } from './components/AllProducts/AllProducts'; 

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AllProducts />} />
      </Routes>
    </div>
  );
}
export default App;