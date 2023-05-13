import React from "react";

function Card({onCardClick, name, link, likes}) {

  function handleCardClick() {
    onCardClick({name, link});
  }

  return (
    <article className="group__element">
      <img className="group__images" src={link} alt={name} onClick={handleCardClick} />
      <button type="button" className="group__button-del"></button>
      <div className="group__title">
        <h2 className="group__name">{name}</h2>
        <div className="group__title_like">
          <button type="button" className="group__button-like"></button>
          <p className="group__like-check">{likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;
