import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    imdbRating: string;
}

interface MovieData {
    Search: Movie[];
    totalResults: string;
    Response: string;
}

interface MovieDetails {
    imdbRating: string;
}

function Input() {
    const [searchTerm, setSearchTerm] = useState('');

    const {data, isError, error, isLoading} = useQuery({
        queryKey: ['movies', searchTerm],
        queryFn: async () => {
            if (searchTerm) {
                const response = await axios.get<MovieData>(
                    `https://www.omdbapi.com/?s=${searchTerm}&apikey=d92470ab`
                );
                const moviesWithRatings = await Promise.all(
                    response.data.Search.map(async (movie) => {
                        const movieDetails = await axios.get<MovieDetails>(
                            `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=d92470ab`
                        );
                        return {
                            ...movie,
                            imdbRating: movieDetails.data.imdbRating,
                        };
                    })
                );
                return {...response.data, Search: moviesWithRatings};
            }
            return null;
        },
        enabled: !!searchTerm,
    });

    return (
        <section className="mt-10">
            <div className="w-full flex bg-white shadow-lg rounded-lg overflow-hidden mb-6 space-x-4">
                <input
                    type="text"
                    placeholder="enter movie title..."
                    className="w-full px-4 py-5 focus:outline-none rounded-l-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    className="bg-red-600 flex items-center justify-center cursor-pointer text-white px-8 rounded-r-lg hover:bg-red-700">
                    Search
                </button>
            </div>

            {isLoading && (
                <div className="flex justify-center items-center mb-6">
                    <div
                        className="w-12 h-12 border-4 border-t-4 border-red-600 border-solid rounded-full animate-spin"></div>
                </div>
            )}

            {isError && <div>Error: {error.message}</div>}

            {data?.Search && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {data.Search.map((movie: Movie) => (
                        <div key={movie.imdbID} className="bg-white p-4 rounded-lg shadow-md">
                            <img
                                src={movie.Poster}
                                alt={movie.Title}
                                className="w-full h-64 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-lg font-semibold">{movie.Title}</h3>
                            <p className="text-gray-500">{movie.Year}</p>
                            <p className="text-yellow-500 font-semibold">
                                IMDb Rating: <span className={'text-black'}>{movie.imdbRating}</span>
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default Input;