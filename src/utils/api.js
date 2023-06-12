import axios from "axios";
const instance = axios.create( {
  baseURL: process.env.REACT_APP_API_ENDPOINT, //api url
} );

export const config = () => {
  const TOKEN = localStorage.getItem( "authToken" );
  return {
    headers: {
      Authorization: "Bearer " + TOKEN,
    },
  };
};

export default instance;
