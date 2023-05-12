import React from 'react';

function PopupWithForm({ title, name, children, isOpen, onClose }) {
  return (
    <>
      <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
        <div className="popup__container">
          <button type="button" className="popup__close popup__close_profel" onClick={onClose}></button>
          <h3 className="popup__title">{`${title}`}</h3>
          <form className="popup__form popup__form-profel" name={`popup-form-${name}`} novalidate>
            {children}
            <button className="popup__button-save" type="submit">Сохранить</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default PopupWithForm
