import React from "react";
import api from "../utils/Api";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from "./ImagePopup";
import { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithConfirm from "./PopupWithConfirm";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from '../utils/Auth.js';
import Fail from "../images/Fail.svg";
import Success from "../images/Success.svg";

function App() {

  //переменные состояния
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isPopupWithConfirmOpen, setIsPopupWithConfirmOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  //стейт для данных из Api
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardDelete, setCardDelete] = useState({ name: '', link: '' });
  const [isLoading, setIsLoading] = useState(true);

  //стейт для авторизации
  const [loggedIn, setLoggedIn] = useState(false);
  const [profileEmail, setProfileEmail] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const [alt, setAlt] = useState('');

  const history = useHistory();

  useEffect(() => {
    tokenCheck();
  }, []);

  //эффект при монтировании
  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([dataUser, dataCards]) => {
          setCurrentUser(dataUser);
          setCards(dataCards);
          setIsLoading(false);
        })
        .catch((err) => console.log(err))
    }
  }, [loggedIn]);

  //При клике на лайк
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err))
  }

  //При клике на корзину
  function handleConfirmCardDelete() {
    const isOwn = cardDelete.owner._id === currentUser._id;
    setIsLoading(true)
    api
      .deleteCard(cardDelete._id, !isOwn)
      .then((newCard) => {
        const newArr = cards.filter(c => c._id === cardDelete._id ? !newCard : c);
        setCards(newArr);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {setIsLoading(false)})
  }

  function handleCardDelete(card) {
    setCardDelete(card);
    handleDeleteCardClick();
  }

  //Обработчики попапов
  function handleEditProfileClick() { setIsEditProfilePopupOpen(true) }
  function handleAddPlaceClick() { setIsAddPlacePopupOpen(true) }
  function handleEditAvatarClick() { setIsEditAvatarPopupOpen(true) }
  function handleDeleteCardClick() { setIsPopupWithConfirmOpen(true) }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsPopupWithConfirmOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({ name: '', link: '' });
  }

  //Закрытие попапа по Escape
  //Создаем переменную isOpen снаружи useEffect, в которой следим за всеми состояниями попапов. Если хоть одно состояние true или не null, 
  //то какой-то попап открыт, значит, навешивать нужно обработчик.
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link ||  isPopupWithConfirmOpen || isInfoTooltipOpen

  //Объявляем функцию внутри useEffect, чтобы она не теряла свою ссылку при обновлении компонента.
  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) 
  
  function handleCardClick(res) { setSelectedCard(res) }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.editingUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        setIsLoading(false);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api.changeAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        setIsLoading(false);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit(newCard) {
    setIsLoading(true);
    api.createNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsLoading(false);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }



  function handleLogin(email, password) {
    return auth.authorize(email, password)
      .then((data) => {
        if (!data.token) throw new Error('Missing jwt');  //проверяем, есть ли свойство token в объекте data, который вернул сервер
        //сохраняем токен в локальном хранилище
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
        setProfileEmail(email);
        history.push('/');
      })
      .catch(err => {
        console.log(err);
        setIsInfoTooltipOpen(true);
        setMessage({ message: 'Что-то пошло не так! Попробуйте ещё раз.' });
        setImage({ image: Fail });
        setAlt({alt: 'Ошибка'});
      });
  };

  function handleRegister(email, password) {
    return auth.register(email, password)
      .then(() => {
        setMessage({ message: 'Вы успешно зарегистрировались!' });
        setImage({ image: Success });
        setAlt({alt: 'Успешно'});
        history.push('/signin');
      })
      .catch(err => {
        console.log(err);
        setMessage({ message: 'Что-то пошло не так! Попробуйте ещё раз.' });
        setImage({ image: Fail });
        setAlt({alt: 'Ошибка'});
      })
      .finally(() => {setIsInfoTooltipOpen(true)})
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) return;

    auth.checkToken(jwt).then((data) => {
      setLoggedIn(true);
      setIsLoading(false);
      setProfileEmail(data.data.email);
      history.push("/");
    })
    .catch((err) => {console.log(err)});
  };

  function handleLogout() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push("/signin");
  }

  return (
    // Компонент Provider используется для передачи текущего
    // аутентифицированного пользователя вниз по дереву. Любой компонент может использовать
    // этот контекст и не важно, как глубоко он находится.
    // Мы передаём "currentUser" в качестве значения контекста.
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          email={profileEmail}
          onLogout={handleLogout}
        />
        <Switch>
          <ProtectedRoute
            exact
            path='/'
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick} //передаем обработчики с помощью пропса, вызывваем в main.js
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
          <Route path='/signin'>
            <Login onLogin={handleLogin} />
          </Route>
          <Route path='/signup'>
            <Register onRegister={handleRegister} />
          </Route>
          <Route path='/'>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isLoading={isLoading} />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <PopupWithConfirm isOpen={isPopupWithConfirmOpen} onClose={closeAllPopups} onSubmit={handleConfirmCardDelete} isLoading={isLoading} />

        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} onMessage={message} onImage={image} onAlt={alt}/>
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;
