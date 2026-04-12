import OauthCallbackComponent from '../components/oauthComponent';
import { type JSX } from 'react';

/**
 * The oauth callback component serves as the main page for users login in with github.
 *
 * @returns {JSX.Element} The oauth callback page component.
 */
export default function RegisterPage(): JSX.Element {
    return <OauthCallbackComponent />;
}