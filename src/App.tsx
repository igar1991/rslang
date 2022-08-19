import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authorization from "./pages/authorization";
import Header from "./pages/components/header";
import Games from "./pages/games";
import Main from "./pages/main";
import Statistics from "./pages/statistics";
import Vocabulary from "./pages/vocabulary";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/vocabulary" element={<Vocabulary />} />
          <Route path="/games" element={<Games />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/authorization" element={<Authorization />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
