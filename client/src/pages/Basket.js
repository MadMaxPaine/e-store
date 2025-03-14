import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { ctx } from "../store/context";
import { getDevicesInBasket, clearBasket } from "../http/basketAPI";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { runInAction } from "mobx"; 
import { REACT_APP_API_URL } from "../utils/consts";

const Basket = observer(() => {
  const { basket, user } = useContext(ctx); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {    
    const fetchBasket = async (id) => {
      if (!id) {
        setError("User not authenticated");
        return;
      }
      setIsLoading(true);
      try {
        let data = await getDevicesInBasket(id);
        runInAction(() => {
          basket.setBasketItems(data); 
        });
      } catch (err) {
        setError("Failed to fetch basket");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?._user?.id) {
      fetchBasket(user._user.id);
    } else {
      setError("User not authenticated");
    }
  }, [basket, user?._user?.id]);

  const handleRemoveItem = async (id) => {
    setIsLoading(true);
    try {
      await basket.removeItem(id);
    } catch (err) {
      setError("Failed to remove item");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearBasket = async () => {
    if (!user?._user?.id) {
      setError("User not authenticated");
      return;
    }
    setIsLoading(true);
    try {
      await clearBasket(user._user.id);
      runInAction(() => {
        basket.clearBasket(); 
      });
    } catch (err) {
      setError("Failed to clear basket");
      console.error("Error clearing basket:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", color: "#333" }}
      >
        Your Basket
      </Typography>
      {isLoading ? (
        <Typography variant="h6" align="center" sx={{ color: "#888" }}>
          Loading...
        </Typography>
      ) : error ? (
        <Typography variant="h6" align="center" sx={{ color: "red" }}>
          {error}
        </Typography>
      ) : basket.items.length > 0 ? (
        <Box>
          {basket.items.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #ddd",
                padding: "15px 0",
              }}
            >
              <img
                src={REACT_APP_API_URL + item.img}
                alt={item.name}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginRight: "20px",
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#555" }}>
                  {item.name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#FF5722", fontWeight: "bold" }}
                >
                  Price: ${item.price} x {item.quantity} = $
                  {(item.price * item.quantity).toFixed(2)}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "15px",
                  padding: "8px 0",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    color: "#333",
                    textAlign: "center",
                    width: "50px",
                    backgroundColor: "#f4f4f4",
                    padding: "5px 10px",
                    borderRadius: "30px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {item.quantity}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    background: "linear-gradient(135deg, #FF5722, #E64A19)",
                    color: "white",
                    padding: "8px 20px",
                    borderRadius: "30px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "linear-gradient(135deg, #E64A19, #FF5722)",
                      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
                    },
                    "&:active": {
                      transform: "scale(0.98)", 
                    },
                  }}
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography
          variant="h6"
          align="center"
          sx={{ fontStyle: "italic", color: "#888" }}
        >
          Your basket is empty
        </Typography>
      )}
      {basket.items.length > 0 && (
        <Button
          variant="contained"
          sx={{
            display: "block",
            margin: "20px auto",
            backgroundColor: "#FF5722",
            color: "white",
          }}
          onClick={handleClearBasket}
        >
          Clear Basket
        </Button>
      )}
    </Box>
  );
});

export default Basket;
