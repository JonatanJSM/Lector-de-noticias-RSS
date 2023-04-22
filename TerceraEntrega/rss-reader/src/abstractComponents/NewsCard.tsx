import * as React from 'react';
import { News } from 'public/interface/NewsInfo';
import { useState } from 'react';
import styles from '@/styles/NewsCard.module.css'

interface ComponentNewsCardProps {
  news:News;
}

const NewsCard:React.FC<ComponentNewsCardProps> = ({news}) => {
  const [showDescription, setShowDescription] = useState(false)

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardBody}>
        <img src={"/imgNews/"+news?.image} alt={news?.title} className={styles.cardImage} />
        <h2 className={styles.cardTitle}>{news?.title}</h2>
        <div className={styles.cardCategory}>{news?.category}</div>
          <div className={styles.cardDate}>{news?.pubDate.substring(0,10)}</div>
        <div className={styles.cardDescription}>
          <p>{news?.description}</p>
        </div>
        <div className="card-footer">
          <button className={styles.cardLinkButton} onClick={() => window.open(news?.link, '_blank')}>
            Ir al sitio
          </button>
          
        </div>
      </div>
    </div>
  );
}
export default NewsCard;
