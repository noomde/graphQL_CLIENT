import { useState, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { GET_PLATFORMS_QUERY } from '../graphql/platformsOperations.ts';
import { platformQueryData } from '../types/responseTypes.ts';

export 