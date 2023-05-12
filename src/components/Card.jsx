import React from "react";

function Card({onCardClick, name, link, likes}) {

  function handleCardClick() {
    onCardClick({name, link});
  }

  return (
    <article class="group__element">
      <img class="group__images" src={link} alt={name} onClick={handleCardClick} />
      <button type="button" class="group__button-del"></button>
      <div class="group__title">
        <h2 class="group__name">{name}</h2>
        <div class="group__title_like">
          <button type="button" class="group__button-like"></button>
          <p class="group__like-check">{likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;
