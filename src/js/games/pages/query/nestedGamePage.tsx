import NestedGameComponent from '../../components/query/nestedGameComponent.tsx';
import { type JSX } from 'react';
import { useParams } from 'react-router-dom';

/**
 * A page that displays the data of a single game, including its nested data.
 *
 * @returns {JSX.Element} The NestedGamePage component.
 */
export default function NestedGamePage(): JSX.Element {
  const { id } = useParams<{ id: string }>();

  return <NestedGameComponent id={Number(id)} />;
}
