import React, { useContext, useState, useEffect } from "react";
import { ctx } from '../store/context';
import { fetchUserInfo } from "../http/userAPI"; 
import { Avatar, Box, Typography, Paper, Divider, Grid, Button } from "@mui/material"; 
const { REACT_APP_API_URL } = require('../utils/consts');

const UserInfo = () => {
  const { user } = useContext(ctx);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    secondName: "",
    phone: "",
    gender: "",
    avatar: "",
  });

  useEffect(() => {
    const userId = user._user?.id; // Перевірка на наявність userId
    if (userId) {
      fetchUserInfo(userId)
        .then((data) => setUserInfo(data))
        .catch((error) => console.error("Error fetching user info:", error)); // Обробка помилок
    }
  }, [user]);

  const avatarSrc = userInfo.avatar ? `${REACT_APP_API_URL}/${userInfo.avatar}` : '/default-avatar.png'; // Використання дефолтного аватара

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <Paper sx={{ padding: 3, textAlign: "center" }}>
        <Avatar
          sx={{ width: 120, height: 120, margin: "auto" }}
          alt={userInfo.firstName || "User Avatar"}
          src={avatarSrc}
        />
        <Typography variant="h4" sx={{ marginTop: 2 }}>
          {userInfo.firstName} {userInfo.secondName}
        </Typography>
        <Divider sx={{ margin: "16px 0" }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">Phone: {userInfo.phone}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">Gender: {userInfo.gender}</Typography>
          </Grid>
        </Grid>
        <Box sx={{ marginTop: 3 }}>
          <Button variant="outlined" fullWidth onClick={() => alert('Edit Profile clicked')}>
            Edit Profile
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default UserInfo;
