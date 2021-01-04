import axios from 'axios';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 5,
        key: 'AIzaSyBsU5PWYl_AesH3un5GvQ3gMu-3IZkpsxE'   
    }

})