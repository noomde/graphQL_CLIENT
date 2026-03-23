import { gql } from '@apollo/client';

export const GET_PLATFORMS_QUERY = gql`
    query { 
        platforms {
            id
            name
        }
    }
`;