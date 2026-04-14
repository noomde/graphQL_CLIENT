import { useState, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateGame } from '../../hooks/useMutationGame.ts';

import { type Genre, GENRES } from '../../types/genresType.ts';
import { type Rating, RATINGS } from '../../types/ratingType.ts';

/**
 * A component for creating a game.
 *
 * @returns An element with a form to create a game and the mutation state.
 */
export default function CreateGameComponent(): JSX.Element {
  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [rating, setRating] = useState<Rating | ''>('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [description, setDescription] = useState('');
  const [developer, setDeveloper] = useState('');
  const [publisher, setPublisher] = useState('');

  const { createGame } = useCreateGame();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  /**
   * Handles the form submission for creating a game. It calls the createGame mutation and navigates to the home page on success, or sets an error message on failure.
   *
   * @param event - The form submission event.
   */
  async function handleCreateGame(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const game = await createGame({
        title,
        releaseDate,
        rating: rating as Rating,
        genres,
        description,
        developer,
        publisher,
      });
      navigate(`/games/${game?.id}`);
    } catch (error) {
      setError('Failed to create game, please try again.');
      console.error('Create game error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleCreateGame}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />

      <input
        type="date"
        value={releaseDate}
        onChange={(e) => setReleaseDate(e.target.value)}
      />

      <select
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

      {GENRES.map((genre) => (
        <label key={genre}>
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

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />

      <input
        type="text"
        value={developer}
        onChange={(e) => setDeveloper(e.target.value)}
        placeholder="Developer"
      />

      <input
        type="text"
        value={publisher}
        onChange={(e) => setPublisher(e.target.value)}
        placeholder="Publisher"
      />

      {error && <p>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create game'}
      </button>
    </form>
  );
}
