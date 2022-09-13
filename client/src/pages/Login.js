import React, { useState, useContext } from 'react';
import { ctx } from '../index';
import { NavLink, useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
const Login = observer(() => {
  const { user } = useContext(ctx);
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const logining = async () => {
    try {
      await user.login(email, password);
      history.push(SHOP_ROUTE);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <Box
      container
      sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: window.innerHeight - 54 }}
    >
      <Card sx={{ p: 2 }}>
        <CardContent>
          <Typography variant="h4" sx={{ display: "flex", itemsAlign: "center", justifyContent: "center", mt: 1 }} component="h2" gutterBottom>
            Authorization
          </Typography>
          <Divider orientation="horizontal" sx={{ mt: 1 }} ></Divider>
          <Stack direction="column" sx={{ display: "flex", itemsAlign: "center", justifyContent: "center", mt: 1 }}>
            <Box item >
              <TextField
                fullWidth
                sx={{ mt: 1 }}
                size="small"
                helperText="Please enter you're e-mail"
                id="deviceName"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={"Enter you're email address..."}
                label="E-mail"
              />
            </Box>
            <Box item >
              <TextField
                fullWidth
                sx={{ mt: 1 }}
                size="small"
                helperText="Please enter you're password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                type={"password"}
                label="Password"
                placeholder={"Enter you're password..."}
              />
            </Box>
          </Stack>
          <Divider orientation="horizontal" ></Divider>
          <Box size="small" mt={1}>
            Do not have account yet? <NavLink to={REGISTRATION_ROUTE}>Register here...</NavLink>
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={logining}>Enter</Button>
        </CardActions>
      </Card>
    </Box>
  );
});
export default Login;