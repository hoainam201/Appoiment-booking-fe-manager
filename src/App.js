import logo from './logo.svg';
import './App.css';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ToastContainer} from 'react-toastify';
import Layouts from "./layouts";
import {NormalRoutes} from "./routes";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route element={<Layouts/>}>
          {NormalRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element}/>
          ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
