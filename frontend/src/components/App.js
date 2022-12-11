import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import '../pages/index.css';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
    const [registerStatus, setRegisterStatus] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useNavigate();

    React.useEffect(() => {
        const jwt = localStorage.getItem('token');
        if (jwt) {
            auth.getContent(jwt).then((res) => {
                if (res.data._id) {
                    setEmail(res.data.email);
                    history('/');
                    setLoggedIn(true);
                }
            })
                .catch((err) => {
                    console.log(err);
                    setLoggedIn(false);
                });
        }
    }, []);

    React.useEffect(() => {
        api.getUserInfo()
            .then((userData) => {
                setCurrentUser(userData);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    React.useEffect(() => {
        api.getInitialCards()
            .then((cards) => {
                setCards(cards);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Регистрация, авторизация и выход
    function handleLogin(email, password) {
        auth.authorize(email, password)
            .then((res) => {
                setLoggedIn(true);
                setEmail(email);
                setPassword(password);
                localStorage.setItem('token', res.token);
                history('/');
            })
            .catch((err) => {
                console.log(err);
                setRegisterStatus(false);
                setIsRegisterPopupOpen(true);
            });
    };

    function handleRegister(email, password) {
        auth.register(email, password)
            .then(() => {
                setRegisterStatus(true);
                history('/sign-in');
            })
            .then(() => {
                setEmail('');
                setPassword('');
            }).catch((err) => {
                console.log(err);
                setRegisterStatus(false);
            })
            .finally(() => {
                setIsRegisterPopupOpen(true);
            })
    };

    function handleSignout() {
        localStorage.removeItem('token');
        setEmail('');
        setPassword('');
        setLoggedIn(false);
    };

    // хандлеры изменения стейт переменных
    function handleCardClick(card) {
        setSelectedCard(card);
    };

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    };

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    };

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    };

    // хандлеры для вызова API методов

    function handleUpdateAvatar(userData) {
        setIsLoading(true);
        api.setNewAvatar(userData)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => setIsLoading(false));
    }

    function handleUpdateUser(userData) {
        setIsLoading(true);
        api.setUserInfo(userData)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => setIsLoading(false));
    };

    function handleAddPlaceSubmit(card) {
        setIsLoading(true);
        api.addNewCard(card.name, card.link)
            .then((card) => {
                setCards([card, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => setIsLoading(false));
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // закрытие всех попапов
    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsRegisterPopupOpen(false);
        setSelectedCard({});
    };

    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link

    React.useEffect(() => {
      function closeByEscape(evt) {
        if(evt.key === 'Escape') {
          closeAllPopups();
        }
      }
      if(isOpen) {
        document.addEventListener('keydown', closeByEscape);
        return () => {
          document.removeEventListener('keydown', closeByEscape);
        }
      }
    }, [isOpen]);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header
                    email={email}
                    onSignOut={handleSignout} />
                <Routes>
                    <Route path="/" element={
                        <ProtectedRoute loggedIn={loggedIn}>
                            <Main
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onEditAvatar={handleEditAvatarClick}
                                onCardClick={handleCardClick}
                                cards={cards}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete} />
                        </ProtectedRoute>
                    }>
                    </Route>
                    <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
                    <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
                </Routes>
                <Footer />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isLoading={isLoading} />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    isLoading={isLoading} />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                    isLoading={isLoading} />
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups} />
                <InfoTooltip
                    isOpen={isRegisterPopupOpen}
                    status={registerStatus}
                    onClose={closeAllPopups} />
            </div>
        </CurrentUserContext.Provider>
    )
}

export default App;
