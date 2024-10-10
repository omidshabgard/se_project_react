import "./ItemCard.css";
import likeIcon from "../../assets/rating/heart-fill.svg";
import dislikeIcon from "../../assets/rating/dislike.png";
import { likeItem, dislikeItem } from "../../utils/Api";
import { useState , useEffect } from "react";
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'; 

function ItemCard({ item, onCardClick }) {

  const { currentUser } = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    const userId = currentUser?._id;

    if (item.likes.length > 0 && userId && item.likes.includes(userId)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [item.likes]);

  const handleLikeClick = async () => {
    try {
      setIsLiked(!isLiked);

      if (isLiked) {
        await dislikeItem(item._id);
      } else {
        await likeItem(item._id);
      }
    } catch (error) {
      console.error("Error liking/disliking the item:", error);
      setIsLiked(isLiked);
    }
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>

      <img
        className="like__icon"
        src={isLiked ? likeIcon : dislikeIcon}
        alt={isLiked ? "like" : "DisLike"}
        onClick={handleLikeClick}
        style={{ cursor: "pointer" }}
      />

      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
