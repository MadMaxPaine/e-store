import React, { useEffect, useState, useContext } from "react";
import {  useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  Divider,
  Rating,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { 
  BASKET_ROUTE
} from "../utils/consts";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useParams } from "react-router-dom";
import { fetchOneDevice } from "../http/deviceAPI";
import { observer } from "mobx-react-lite";
import { ctx } from "../store/context"; // Import your context for the basket

const DevicePage = observer(() => {
  const [device, setDevice] = useState({ info: [] });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const { basket } = useContext(ctx); // Get basket from context
  const history = useNavigate(ctx);
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchOneDevice(id)
      .then((data) => {
        if (isMounted) {
          setDevice(data);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted) {
          setLoading(false);
        }
        console.error("Error fetching device:", error);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Add item to the basket
  const addToBasket = () => {
    basket.addItem(device); // Call addItem from basket store
    history(BASKET_ROUTE);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", p: 2 }}>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="flex-start"
      >
        {/* Картка із зображенням */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: isDarkMode
                ? "0 4px 12px rgba(255, 255, 255, 0.1)"
                : "0 4px 12px rgba(0,0,0,0.1)",
              backgroundColor: isDarkMode ? "#1e1e1e" : "#fff",
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.03)" },
            }}
          >
            {device.img && (
              <CardMedia
                component="img"
                height="300"
                image={process.env.REACT_APP_API_URL + device.img}
                alt={device.name}
                sx={{
                  objectFit: "contain",
                  background: isDarkMode ? "#2c2c2c" : "#f9f9f9",
                  p: 2,
                }}
              />
            )}
            <CardContent>
              <Typography
                variant="h5"
                align="center"
                fontWeight={600}
                sx={{ color: isDarkMode ? "#e0e0e0" : "#000" }}
              >
                {device.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Рейтинг */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              textAlign: "center",
              background: isDarkMode ? "#2d2d2d" : "#f0f4f8",
              borderRadius: 3,
              p: 3,
              boxShadow: isDarkMode
                ? "0 4px 8px rgba(255, 255, 255, 0.1)"
                : "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: isDarkMode ? "#90caf9" : "#000" }}
            >
              Rating
            </Typography>
            <Rating
              name="device-rating"
              value={device.rating}
              readOnly
              precision={0.5}
              size="large"
              sx={{ color: "#ffb400" }}
            />
            <Typography
              variant="body1"
              mt={1}
              sx={{ color: isDarkMode ? "#ccc" : "#000" }}
            >
              {device.rating} / 5
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box
            sx={{
              background: isDarkMode
                ? "linear-gradient(135deg, #90caf9, #42a5f5)"
                : "linear-gradient(135deg, #1976d2, #42a5f5)",
              color: isDarkMode ? "#000" : "#fff",
              p: 4,
              borderRadius: 3,
              boxShadow: isDarkMode
                ? "0 4px 10px rgba(255, 255, 255, 0.2)"
                : "0 4px 10px rgba(0,0,0,0.2)",
              textAlign: "center",
            }}
          >
            <Typography variant="h4" fontWeight={700}>
              ${device.price}
            </Typography>
            <Button
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              sx={{
                mt: 2,
                background: isDarkMode ? "#1e1e1e" : "#fff",
                color: isDarkMode ? "#90caf9" : "#1976d2",
                borderRadius: 2,
                "&:hover": {
                  background: isDarkMode ? "#333" : "#e3f2fd",
                },
              }}
              onClick={addToBasket} // Add to basket handler
            >
              Add to Basket
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography
          variant="h5"
          fontWeight={600}
          gutterBottom
          sx={{ color: isDarkMode ? "#e0e0e0" : "#000" }}
        >
          Description
        </Typography>
        {device.info.map((info, index) => (
          <Box key={info.id}>
            <Grid
              container
              spacing={2}
              sx={{
                p: 2,
                background: isDarkMode
                  ? index % 2 === 0
                    ? "#424242"
                    : "#303030"
                  : index % 2 === 0
                  ? "#e3f2fd"
                  : "#f5f5f5",
                borderRadius: 2,
              }}
            >
              <Grid item xs={6}>
                <Typography
                  variant="body1"
                  fontWeight={500}
                  sx={{ color: isDarkMode ? "#fff" : "#000" }}
                >
                  {info.title}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  sx={{ color: isDarkMode ? "#bdbdbd" : "#666" }}
                >
                  {info.description}
                </Typography>
              </Grid>
            </Grid>
            {index !== device.info.length - 1 && (
              <Divider sx={{ backgroundColor: isDarkMode ? "#555" : "#ccc" }} />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
});

export default DevicePage;
