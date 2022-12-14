import { AchievementPopup } from 'pages/statistics/components/achievements/achievement-popup';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';
import { selectAuth } from 'redux/slices/authUserSlice';
import Authorization from './pages/components/authorization';
import Footer from './pages/components/footer';
import Header from './pages/components/header';
import ModalMessage, { MessageType } from './pages/components/modal-message';
import ProfileModal from './pages/components/profile';
import Registration from './pages/components/registration';
import Games from './pages/games';
import AudioCall from './pages/games/audiocall';
import Sprint from './pages/games/sprint';
import Main from './pages/main';
import Statistics from './pages/statistics';
import Vocabulary from './pages/vocabulary';

function App(): JSX.Element {
  const { isAuth, createStatistic } = useAppSelector(selectAuth);

  const [registerModal, setRegisterModal] = useState(false);
  const [authorizationModal, setAuthorizationModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [message, setMessage] = useState<MessageType>({ show: false, text: '', severity: undefined });

  const openRegisterModal = () => setRegisterModal(true);
  const closeRegisterModal = () => setRegisterModal(false);

  const openAuthorizationModal = () => setAuthorizationModal(true);
  const closeAuthorizationModal = () => setAuthorizationModal(false);

  const openProfileModal = () => setProfileModal(true);

  return (
    <>
      <Router>
        <Header openAuthorizationModal={openAuthorizationModal} openProfileModal={openProfileModal}/>
        <Routes>
          <Route path='/' element={<Main openRegisterModal={openRegisterModal} openAuthorizationModal={openAuthorizationModal} />} />
          <Route path='/vocabulary' element={<Vocabulary />} />
          <Route path='/games' element={<Games />} />
          <Route path='/games/audiocall' element={<AudioCall />} />
          <Route path='/games/sprint' element={<Sprint />} />
          <Route path='/statistics' element={<Statistics />} />
        </Routes>
        <Registration openAuthorizationModal={openAuthorizationModal} registerModal={registerModal} closeRegisterModal={closeRegisterModal} setMessage={setMessage} />
        <Authorization openRegisterModal={openRegisterModal} authorizationModal={authorizationModal} closeAuthorizationModal={closeAuthorizationModal} setMessage={setMessage} />
        <ProfileModal profileModal={profileModal} setProfileModal={setProfileModal} setMessage={setMessage} />
        <ModalMessage message={message} setMessage={setMessage} />
        {isAuth && createStatistic && <AchievementPopup />}
        <Footer />
      </Router>
    </>
  );
}

export default App;
