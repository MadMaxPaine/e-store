import { observer } from 'mobx-react-lite';
import { BrowserRouter } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { ctx } from '.';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { CircularProgress } from '@mui/material';
const App = observer(() => {
  const { user } = useContext(ctx);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      user.checkAuth();
    }
  }, [user]);
  if (user._isLoading) {
    return <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%' }} />
  }
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
