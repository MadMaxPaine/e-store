import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ctx } from '../store/context';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { deleteDeviceFromBasket, getDevicesInBasket, updateDeviceInBasket, clearBasket, addDeviceIntoBasket } from '../http/basketAPI';

const StyledItem = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    padding: '15px 0',
});

const StyledImage = styled('img')({
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginRight: '20px',
});

const StyledButton = styled(Button)({
    backgroundColor: '#FF5722',
    color: 'white',
    '&:hover': {
        backgroundColor: '#FF3D00',
    },
    borderRadius: '20px',
    padding: '6px 12px',
    fontWeight: 'bold',
    fontSize: '0.8rem',
    margin: '0 5px',
});

const Basket = observer(() => {
    const { user } = useContext(ctx);
    const { basket } = useContext(ctx);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBasket = async () => {
            setIsLoading(true);
            try {
                const data = await getDevicesInBasket(user.id);
                basket.setBasketItems(data);
            } catch (err) {
                setError('Failed to fetch basket');
            } finally {
                setIsLoading(false);
            }
        };

        fetchBasket();
    }, [basket]);

    const removeItem = async (id) => {
        setIsLoading(true);
        try {
            const item = basket.items.find((item) => item.id === id);
            await deleteDeviceFromBasket(item);
            basket.removeItem(id);
        } catch (err) {
            setError('Failed to remove item');
        } finally {
            setIsLoading(false);
        }
    };

    const removeAllItem = async (id) => {
        setIsLoading(true);
        try {
            const item = basket.items.find((item) => item.id === id);
            await deleteDeviceFromBasket(item);
            basket.removeAllItem(id);
        } catch (err) {
            setError('Failed to remove all items');
        } finally {
            setIsLoading(false);
        }
    };

    const updateItemInBasket = async (item) => {
        setIsLoading(true);
        try {
            await updateDeviceInBasket(item);
            basket.addItem(item);
        } catch (err) {
            setError('Failed to update item');
        } finally {
            setIsLoading(false);
        }
    };

    const clearAllItems = async () => {
        setIsLoading(true);
        try {
            await clearBasket();
            basket.clearBasket();
        } catch (err) {
            setError('Failed to clear basket');
        } finally {
            setIsLoading(false);
        }
    };

    // Додаємо новий товар в кошик
    const addItemToBasket = async (item) => {
        setIsLoading(true);
        try {
            await addDeviceIntoBasket(item);  // Викликаємо API для додавання товару
            basket.addItem(item);  // Оновлюємо кошик локально
        } catch (err) {
            setError('Failed to add item to basket');
        } finally {
            setIsLoading(false);
        }
    };

    const groupedItems = basket.items.reduce((acc, item) => {
        if (acc[item.id]) {
            acc[item.id].quantity += 1;
        } else {
            acc[item.id] = { ...item, quantity: 1 };
        }
        return acc;
    }, {});

    const itemList = Object.values(groupedItems);

    return (
        <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#333' }}>
                Your Basket
            </Typography>
            {isLoading ? (
                <Typography variant="h6" align="center" sx={{ color: '#888' }}>
                    Loading...
                </Typography>
            ) : error ? (
                <Typography variant="h6" align="center" sx={{ color: 'red' }}>
                    {error}
                </Typography>
            ) : itemList.length > 0 ? (
                <Box>
                    {itemList.map((item) => (
                        <StyledItem key={item.id}>
                            <StyledImage
                                src={process.env.REACT_APP_API_URL + item.img}
                                alt={item.name}
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#555' }}>
                                    {item.name}
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#FF5722', fontWeight: 'bold' }}>
                                    Price: ${item.price} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <StyledButton variant="contained" onClick={() => removeItem(item.id)}>
                                    Remove One
                                </StyledButton>
                                <StyledButton variant="contained" onClick={() => removeAllItem(item.id)}>
                                    Remove All
                                </StyledButton>
                                <StyledButton variant="contained" onClick={() => updateItemInBasket(item)}>
                                    Update Item
                                </StyledButton>
                                <StyledButton variant="contained" onClick={() => addItemToBasket(item)}>
                                    Add to Basket
                                </StyledButton>
                            </Box>
                        </StyledItem>
                    ))}
                </Box>
            ) : (
                <Typography variant="h6" align="center" sx={{ fontStyle: 'italic', color: '#888' }}>
                    Your basket is empty
                </Typography>
            )}
            <StyledButton variant="contained" onClick={clearAllItems}>
                Clear All Items
            </StyledButton>
        </Box>
    );
});

export default Basket;
