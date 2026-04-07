import NestedGameComponent from '../../components/query/nestedGameComponent.tsx';
import { type JSX } from 'react';
import { useParams } from 'react-router-dom';

export default function NestedGamePage(): JSX.Element {
  const { id } = useParams<{ id: string }>();

  return <NestedGameComponent id={Number(id)} />;
}
