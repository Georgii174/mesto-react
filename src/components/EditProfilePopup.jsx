import {useEffect, useState, useContext} from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleNameChange(evt) {
    setName(evt.target.value)
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value)
  }

  return (
    <PopupWithForm
        name='edit'
        title='Редактировать профель'
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        buttonText={'Сохранить'}>

          <input type="text" className="popup__input popup__input_name_block" id="name-input" name="name"
            placeholder="Имя" minLength="2" maxLength="40" required
            onChange={handleNameChange}
            value={name || ''} />
          <span className="popup__error popup__error_visible name-input-error"></span>

          <input type="text" className="popup__input popup__input_text_block" id="job-input" name="about"
            placeholder="Вид деятельности" minLength="2" maxLength="200" required
            onChange={handleDescriptionChange}
            value={description || ''} />
          <span className="popup__error popup__error_visible job-input-error"></span>

      </PopupWithForm>
  )
}

export default EditProfilePopup
