import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((err) =>
        console.log(err));
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards([...res]);
      })
      .catch((err) =>
        console.log(err));
  }, [])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopup() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard(null)
  }

  function handleCardLike(likes, _id) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
    .changeLikeStatus(_id, isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === _id ? newCard : c));
    })
    .catch((err) =>
        console.log(err));
  }

  function handleCardDelete(id) {
    api
    .deleteCard(id)
    .then(() => setCards((state) => state.filter((item) => item._id !== id)))
    .catch((err) =>
        console.log(err));
  }

  function handleUpdateUser(data) {
    api
    .setUserInfo(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopup();
    })
    .catch((err) =>
        console.log(err));
  }

  function handleUpdateAvatar(data) {
    api
    .setUserAvatar(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopup();
    })
    .catch((err) =>
        console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    api
    .addCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopup();
    })
    .catch((err) =>
        console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        cards={cards}
      />
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopup}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopup}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopup}
        onAddPlace={handleAddPlaceSubmit}
      />

      <PopupWithForm
        name='delete-card'
        title='Вы уверены?'
        isOpen={false}
      />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopup}
      />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
