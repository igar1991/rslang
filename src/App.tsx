import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Authorization from './pages/components/authorization';
import Footer from './pages/components/footer';
import Header from './pages/components/header';
import ModalMessage from './pages/components/modal-message';
import ProfileModal from './pages/components/profile';
import Registration from './pages/components/registration';
import Games from './pages/games';
import Main from './pages/main';
import Statistics from './pages/statistics';
import Vocabulary from './pages/vocabulary';

function App(): JSX.Element {
  const [registerModal, setRegisterModal] = useState(false);
  const [authorizationModal, setAuthorizationModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [messageModal, setMessageModal] = useState({ open: false, text: '' });

  const openRegisterModal = () => setRegisterModal(true);
  const closeRegisterModal = () => setRegisterModal(false);

  const openAuthorizationModal = () => setAuthorizationModal(true);
  const closeAuthorizationModal = () => setAuthorizationModal(false);

  const openProfileModal = () => setProfileModal(true);
  const closeProfileModal = () => setProfileModal(false);

  return (
    <>
      <Router>
        <Header openAuthorizationModal={openAuthorizationModal} openProfileModal={openProfileModal}/>
        <Routes>
          <Route path='/' element={<Main openRegisterModal={openRegisterModal} openAuthorizationModal={openAuthorizationModal} />} />
          <Route path='/vocabulary' element={<Vocabulary />} />
          <Route path='/games' element={<Games />} />
          <Route path='/statistics' element={<Statistics />} />
        </Routes>
        <Registration openAuthorizationModal={openAuthorizationModal} registerModal={registerModal} closeRegisterModal={closeRegisterModal} setMessageModal={setMessageModal} />
        <Authorization openRegisterModal={openRegisterModal} authorizationModal={authorizationModal} closeAuthorizationModal={closeAuthorizationModal} setMessageModal={setMessageModal} />
        <ProfileModal profileModal={profileModal} closeProfileModal={closeProfileModal} />
        <ModalMessage messageModal={messageModal} setMessageModal={setMessageModal} />
        <Footer />
      </Router>
    </>
  );
}

export default App;
