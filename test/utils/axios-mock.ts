import axios from 'axios';
import AxiosMock from 'axios-mock-adapter';

export const axiosMock = new AxiosMock(axios);
