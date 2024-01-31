import { getOpinions } from "api/getData";
import "./styles.css";
import { useEffect, useState } from "react";

function Information() {
  const [opinions, setOpinions] = useState([]);
  useEffect(() => {
    getOpinions().then((opins) => {
      console.log(opinions)
      setOpinions(opins.filter((opinion) => opinion.status === "Przyjęta"));
    }
    );
  }
    , []);


  const makeStars = (rating) => {
    let stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<span className="star">&#9733;</span>)
    }
    for (let i = 0; i < 5 - rating; i++) {
      stars.push(<span className="star">&#9734;</span>)
    }
    return stars;
  }
  return (
    <div className="information-container">
      <h1>Poznaj opinie o naszej firmie</h1>
      <div className="information">
        {opinions.map((opinion) => {
          return (
            <div key={opinion._id} className="review-card">
              <div className="author">{opinion.author_nick}</div>
              <div className="content">{opinion.description}</div>
              <div className="rating">
                {makeStars(opinion.stars)}
              </div>
            </div>
          )
        })}
      </div>

    </div>
  );
}
export default Information;
