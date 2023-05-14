import React from 'react';
import { api } from '../utils/Api.js'
import Card from './Card'

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch((err) =>
        console.error(err));
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards([...res]);
      })
      .catch((err) =>
        console.error(err));
  }, [])

  return (
    <main className="content">
      <section className="profail">
        <div className="profail__avatar">
          <img src={userAvatar} className="profail__avatar-images" alt="аватарка" />
          <button type="button" className="profail__avatar-button" onClick={onEditAvatar}></button>
        </div>
        <div className="profail__blok">
          <h1 className="profail__name">{userName}</h1>
          <button type="button" className="profail__edit-button" onClick={onEditProfile}></button>
          <p className="profail__text">{userDescription}</p>
        </div>
        <button type="button" className="profail__add-button" onClick={onAddPlace}></button>
      </section>
      <section className="group">
        {cards.map((item) => (
          <Card
            onCardClick={onCardClick}
            {...item}
          />
        ))}
      </section>
    </main>
  )
}


export default Main
