import ScoreComponent from '../components/scoreComponent.tsx';
import { type JSX } from 'react';
import { useParams } from 'react-router-dom';

/**
 * ScorePage component serves as the page for a single score.
 *
 * @returns
 */
export default function ScorePage(): JSX.Element {
  const { id } = useParams<{ id: string }>();

  return <ScoreComponent id={Number(id)} />;
}
