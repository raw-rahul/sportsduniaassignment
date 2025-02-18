import { formatDate } from "../../utils/helpers";
import './NewsCard.css'

const NewsCard = ({ article, darkMode }) => {
  return (
    <div className={`news-card ${darkMode ? 'dark-mode' : ''}`}>
      <h2 className="news-card__title">{article.title}</h2>
      <p className="news-card__description">{article.description}</p>
      <div className="news-card__meta">
        <span className="news-card__author">{article.author}</span>
        <span className="news-card__date">{formatDate(article.publishedAt)}</span>
      </div>
    </div>
  );
};

export default NewsCard;