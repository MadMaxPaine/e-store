import React, { useContext, useState, useEffect } from "react";
import { ctx } from '../store/context';
import { fetchUserInfo } from "../http/userAPI"; 
import { Avatar, Box, Typography, Paper, Divider, Grid, Button } from "@mui/material"; 
const {REACT_APP_API_URL} = require('../utils/consts');
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
    const userId = user._user.id;
    fetchUserInfo(userId).then((data) => {
      setUserInfo(data);
    });
  }, [user]);

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <Paper sx={{ padding: 3, textAlign: "center" }}>
        <Avatar
          sx={{ width: 120, height: 120, margin: "auto" }}
          alt={user._user.firstName || "User Avatar"}
          src={user._user.avatar ? `${REACT_APP_API_URL}/${user._user.avatar}` : ""}
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
