import { Outlet } from 'react-router-dom';
import Header from './common/header/Header';

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
