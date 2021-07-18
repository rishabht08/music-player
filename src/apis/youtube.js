
import axios from 'axios';
const API_KEY = 'AIzaSyBrgQNGnh0TJxow6tPQ_ynJ2fv3tgSMLuo';

export default axios.create({
    baseURL:'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults:100,
        key : API_KEY
    }

})
