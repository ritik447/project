import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import MovieList from '../components/MovieList';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchMovies = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/movies/search?query=${query}`);
        setMovies(response.data);
      } catch (error) {
        console.error('Error searching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      searchMovies();
    }
  }, [query]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Search Results for "{query}"
      </Typography>
      
      {loading ? (
        <Typography>Loading results...</Typography>
      ) : movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        <Typography>No movies found for your search.</Typography>
      )}
    </Container>
  );
};

export default SearchResults;