import {createRef, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar}) {

  const avatar = createRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatar.current.value,
    });

  }

  useEffect(()=>{
    avatar.current.value = '';
  }, [avatar, isOpen]);


  return (
    <PopupWithForm
        name='avatar'
        title='Обновить аватар'
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        buttonText={'Обновить'}>

          <input type="url" className="popup__input popup__input_link_avatar" id="avatar-input" name="avatar"
            placeholder="Ссылка на аватарку" required ref={avatar} />
          <span className="popup__error popup__error_visible avatar-input-error"></span>

      </PopupWithForm>
  )
}

export default EditAvatarPopup

