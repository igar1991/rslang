import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Authorization from './pages/authorization';
import Footer from './pages/components/footer';
import Header from './pages/components/header';
import ModalMessage from './pages/components/modal-message';
import Registration from './pages/components/registration';
import Games from './pages/games';
import Main from './pages/main';
import Statistics from './pages/statistics';
import Vocabulary from './pages/vocabulary';

function App(): JSX.Element {
  const [registerModal, setRegisterModal] = useState(false);
  const [messageModal, setMessageModal] = useState({ open: false, text: '' });

  const openRegisterModal = () => setRegisterModal(true);
  const closeRegisterModal = () => setRegisterModal(false);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Main openRegisterModal={openRegisterModal} />} />
          <Route path='/vocabulary' element={<Vocabulary />} />
          <Route path='/games' element={<Games />} />
          <Route path='/statistics' element={<Statistics />} />
          <Route path='/authorization' element={<Authorization />} />
        </Routes>
        <Registration registerModal={registerModal} closeRegisterModal={closeRegisterModal} setMessageModal={setMessageModal} />
        <ModalMessage messageModal={messageModal} setMessageModal={setMessageModal} />
        <Footer />
      </Router>
    </>
  );
}

export default App;
