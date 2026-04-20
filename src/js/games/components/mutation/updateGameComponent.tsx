import { useState, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateGame } from '../../hooks/useMutationGame.ts';
import toast from 'react-hot-toast';

import { type Genre, GENRES } from '../../types/genresType.ts';
import { type Rating, RATINGS } from '../../types/ratingType.ts';

import '../../../../css/games/games.css';

/**
 * A component for updating a game.
 *
 * @param id - The id of the game to update.
 * @returns An element with a form to update the game and the mutation state.
 */
export default function UpdateGameComponent({
  id,
}: {
  id: number;
}): JSX.Element {
  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [rating, setRating] = useState<Rating | ''>('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [description, setDescription] = useState('');
  const [developer, setDeveloper] = useState('');
  const [publisher, setPublisher] = useState('');

  const { updateGame } = useUpdateGame();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  /**
   * Handles the form submission for updating a game. It calls the updateGame mutation and navigates to the home page on success, or sets an error message on failure.
   *
   * @param event - The form submission event.
   */
  async function handleUpdateGame(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const game = await updateGame(id, {
        title,
        releaseDate,
        rating: rating as Rating,
        genres,
        description,
        developer,
        publisher,
      });
      toast.success('Game updated successfully');
      navigate(`/games/${game?.id}`);
    } catch (error) {
      setError('Failed to update game, please try again.');
      console.error('Update game error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="gameMutationCard" onSubmit={handleUpdateGame}>
      <div className="gameMutationHeader">
        <p className="gameDetailEyebrow">Update</p>
        <h1 className="gameDetailTitle">Update game #{id}</h1>
      </div>

      <div className="gameMutationGrid">
        <label className="gameFormField">
          Title
          <input
            className="gameFormInput"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        </label>

        <label className="gameFormField">
          Release date
          <input
            className="gameFormInput"
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
        </label>

        <label className="gameFormField">
          Rating
          <select
            className="gameFormInput"
            value={rating}
            onChange={(e) => setRating(e.target.value as Rating)}
          >
            <option value="">Select rating</option>
            {RATINGS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>

        <label className="gameFormField">
          Developer
          <input
            className="gameFormInput"
            type="text"
            value={developer}
            onChange={(e) => setDeveloper(e.target.value)}
            placeholder="Developer"
          />
        </label>

        <label className="gameFormField">
          Publisher
          <input
            className="gameFormInput"
            type="text"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            placeholder="Publisher"
          />
        </label>
      </div>

      <fieldset className="genreFieldset">
        <legend>Genres</legend>
        <div className="genreGrid">
          {GENRES.map((genre) => (
            <label className="genreOption" key={genre}>
              <input
                type="checkbox"
                checked={genres.includes(genre)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setGenres([...genres, genre]);
                  } else {
                    setGenres(genres.filter((g) => g !== genre));
                  }
                }}
              />
              {genre}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="gameFormField">
        Description
        <textarea
          className="gameFormInput gameFormTextarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
      </label>

      {error && <p className="gameFormError">{error}</p>}

      <div className="gameDetailActions">
        <button className="gameReadMore" type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update game'}
        </button>
      </div>
    </form>
  );
}
