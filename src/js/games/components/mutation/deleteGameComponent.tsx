import { useState, type JSX } from 'react';
import { useDeleteGame } from '../../hooks/useMutationGame.ts';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import '../../../../css/games/games.css';

/**
 * A component for deleting a game.
 *
 * @param id - The id of the game to delete.
 * @returns An element with a button to delete the game and the mutation state.
 */
export default function DeleteGameComponent({
  id,
}: {
  id: number;
}): JSX.Element {
  const { deleteGame } = useDeleteGame();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  /**
   * Handles the button click for deleting a game. It calls the deleteGame mutation and navigates to the home page on success, or sets an error message on failure.
   */
  async function handleDeleteGame() {
    setLoading(true);

    try {
      await deleteGame(id);
      toast.success('Game deleted successfully');
      navigate('/games');
    } catch (error) {
      setError('Failed to delete game, please try again.');
      console.error('Delete game error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="gameMutationCard gameDeleteCard">
      <div className="gameMutationHeader">
        <p className="gameDetailEyebrow">Delete</p>
        <h1 className="gameDetailTitle">Delete game #{id}</h1>
      </div>

      <p className="gameDeleteText">
        Are you sure you want to delete this game?
      </p>

      {error && <p className="gameFormError">{error}</p>}

      <div className="gameDetailActions">
        <button
          className="gameDangerButton"
          onClick={handleDeleteGame}
          disabled={loading}
        >
          {loading ? 'Deleting...' : 'Delete game'}
        </button>

        <button
          className="gameReadMore"
          onClick={() => navigate('/games')}
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </section>
  );
}
