import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { ContextAutor } from '../context/ContextAutor.jsx';


export const Home = () => {
  const [coins, setCoins] = useState([]);

  const navigate = useNavigate();
  const { autor, setAutor, coins: contextCoins, setCoins: setContextCoins, liked: contextLiked, setLiked: setContextLiked, handlelike } = useContext(ContextAutor);


    useEffect(() => {

      fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
          }
          return response.json();
        })
        .then((data) => {
          setCoins(data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err.message);
        })

    }, [])

    return (
      <div>

        <Box component="section" sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'center',
          p: 2,
        }}
        >
          {coins.map((coin) => {
            return (
              <Card
                key={coin.id}
                sx={{
                  maxWidth: 300, minHeight: 300, minWidth: 300, maxHeight: 700,
                  // NUEVO: los botones siempre quedan abajo y la tarjeta se levanta al pasar el mouse
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: 3,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': { transform: 'translateY(-6px)', boxShadow: 6 },
                }}
              >
                <CardMedia
                  // NUEVO: 'contain' muestra el logo completo y m: 2 le da espacio alrededor
                  sx={{ height: 150, m: 2, backgroundSize: 'contain' }}
                  image={coin.image}
                  title={coin.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 600 }}>
                    {coin.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    // NUEVO: verde si sube, rojo si baja
                    sx={{ color: coin.price_change_percentage_24h >= 0 ? 'success.main' : 'error.main', fontWeight: 500 }}
                  >
                    Coin price change percentage (24 hours): {coin.price_change_percentage_24h?.toFixed(2)}%
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Current price: ${coin.current_price.toFixed(2)} USD
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small"
                    variant="contained"
                    onClick={() => setContextLiked((previousLiked) => {
                      const likedCoins = previousLiked || [];
                      return likedCoins.includes(coin.id)
                        ? likedCoins.filter((id) => id !== coin.id)
                        : [...likedCoins, coin.id];
                    })}
                    style={{ backgroundColor: contextLiked?.includes(coin.id) ? 'pink' : undefined }}>
                    {contextLiked?.includes(coin.id) ? 'Me gustaaa' : 'Sí! 💗'}
                  </Button>
                  <Button size="small" onClick={() => navigate("/detail/" + coin.id)}>Click Me</Button>
                </CardActions>
              </Card>
            )
          })}
        </Box>


      </div>
    )
  }
