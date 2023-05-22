import React from "react";
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  function handleNameChange(evt) {
    setName(evt.target.value)
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value)
  }

  return (
    <PopupWithForm
        name='addCard'
        title='Новое место'
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        buttonText={'Добавить'}>
        <>
          <input type="text" className="popup__input popup__input_name_card" id="nameCard-input" name="name"
            placeholder="Название" minLength="2" maxLength="30" required onChange={handleNameChange} />
          <span className="popup__error popup__error_visible nameCard-input-error"></span>

          <input type="url" className="popup__input popup__input_link_card" id="linkCard-input" name="link"
            placeholder="Ссылка на картинку" required onChange={handleLinkChange} />
          <span className="popup__error popup__error_visible linkCard-input-error"></span>
        </>
      </PopupWithForm>
  )

}

export default AddPlacePopup
