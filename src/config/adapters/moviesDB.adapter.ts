import { AxiosAdapter } from "./http/axios.adapter";


export const movieDBFetcher = new AxiosAdapter({
    baseUrl: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '1d1e3eb34d70d120d43954cd81f5915d',
        language: 'es'
    }
})