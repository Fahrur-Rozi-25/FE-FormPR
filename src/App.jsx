// App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Ganti Switch dengan Routes
import Home from './home';
import Success from './success';



function App() {
  return (
    <Router>
      <Routes> {/* Ganti Switch dengan Routes */}
        <Route path="/" element={<Home />} /> {/* Gunakan 'element' untuk menentukan komponen yang ditampilkan */}
        <Route path="/send" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;
