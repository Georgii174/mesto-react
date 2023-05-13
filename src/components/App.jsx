import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
// import '../index.css';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
//import { api } from '../utils/api';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

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

  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        name='edit'
        title='Редактировать профель'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopup}
        buttonText={'Сохранить'}>
        <>
          <input type="text" className="popup__input popup__input_name_block" id="name-input" name="name"
            placeholder="Имя" minLength="2" maxLength="40" required />
          <span className="popup__error popup__error_visible name-input-error"></span>

          <input type="text" className="popup__input popup__input_text_block" id="job-input" name="about"
            placeholder="Вид деятельности" minLength="2" maxLength="200" required />
          <span className="popup__error popup__error_visible job-input-error"></span>
        </>
      </PopupWithForm>
      <PopupWithForm
        name='addCard'
        title='Новое место'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopup}
        buttonText={'Добавить'}>
        <>
          <input type="text" className="popup__input popup__input_name_card" id="nameCard-input" name="name"
            placeholder="Название" minLength="2" maxLength="30" required />
          <span className="popup__error popup__error_visible nameCard-input-error"></span>

          <input type="url" className="popup__input popup__input_link_card" id="linkCard-input" name="link"
            placeholder="Ссылка на картинку" required />
          <span className="popup__error popup__error_visible linkCard-input-error"></span>
        </>
      </PopupWithForm>
      <PopupWithForm
        name='avatar'
        title='Обновить аватар'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopup}
        buttonText={'Обновить'}>
        <>
          <input type="url" className="popup__input popup__input_link_avatar" id="avatar-input" name="avatar"
            placeholder="Ссылка на аватарку" required />
          <span className="popup__error popup__error_visible avatar-input-error"></span>
        </>
      </PopupWithForm>
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
  );
}

export default App;
