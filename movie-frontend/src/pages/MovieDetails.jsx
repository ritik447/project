import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Chip, Stack } from '@mui/material';
import axios from 'axios';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!movie) return <Typography>Movie not found</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        <Box sx={{ flex: 1 }}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </Box>
        <Box sx={{ flex: 2 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            {movie.title}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Chip label={movie.release_date} />
            <Chip label={`${movie.runtime} mins`} />
            <Chip label={`⭐ ${movie.vote_average.toFixed(1)}`} />
          </Stack>
          <Typography variant="body1" paragraph>
            {movie.overview}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Genres
            </Typography>
            <Stack direction="row" spacing={1}>
              {movie.genres.map((genre) => (
                <Chip key={genre.id} label={genre.name} />
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default MovieDetails;