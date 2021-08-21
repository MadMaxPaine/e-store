import { observer } from 'mobx-react-lite';
import { BrowserRouter } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ctx } from '.';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { check } from './http/userAPI';
import { Spinner } from 'react-bootstrap';
const App = observer(() => {
  const { user } = useContext(ctx);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    check().then(data => {
      user.setUser(true);
      user.setIsAuth(true);
    }
    ).finally(setLoading(false));
  }, []);
  if (loading) {
    return <Spinner animation={"grow"} />
  }
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
