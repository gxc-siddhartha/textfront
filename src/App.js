import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import PrimaryP from './pages/primary';
import KeyRPages from './pages/keyRequest';

function App() {
  return (
    <Router>
      <Routes >

        <Route path="/" element={<KeyRPages />} />
        <Route path="/primary/:key" element={<PrimaryP />} />
      </Routes>
    </Router>
  );
}

export default App;
