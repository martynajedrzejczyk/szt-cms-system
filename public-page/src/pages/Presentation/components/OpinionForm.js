import React from "react";
import { useState } from "react";
import { PropTypes } from "prop-types";
import "./styles.css"

const OpinionForm = ({ onSubmit }) => {
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(1);
    return (
        <div className="review-form">
            <h2 className="form-title">Wyraź swoją opinię</h2>
            <form onSubmit={onSubmit(author, content, rating)}>
                <label htmlFor="author" className="form-label">Twój nick:</label>
                <input
                    type="text"
                    id="author"
                    name="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="form-input"
                    required
                />

                <label htmlFor="content" className="form-label">Twoja opinia:</label>
                <textarea
                    id="content"
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="4"
                    className="form-input"
                    required
                ></textarea>

                <label htmlFor="rating" className="form-label">Ocena (od 1 do 5):</label>
                <input
                    type="number"
                    id="rating"
                    name="rating"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                    className="form-input"
                    required
                />

                <button type="submit" className="form-button">Dodaj opinię</button>
            </form>
        </div>
    );
}

export default OpinionForm;

OpinionForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}
