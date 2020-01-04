import axios from 'axios';
import { FETCH_USER } from './Types';

export const fetchUser = () => async dispatch =>
  dispatch({
    type: FETCH_USER,
    payload: await axios.get('/api/current_user')
  });
