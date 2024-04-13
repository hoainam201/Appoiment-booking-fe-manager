import logo from './logo.svg';
import './App.css';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ToastContainer} from 'react-toastify';
import Layouts from "./layouts";
import {NormalRoutes, AuthRoutes} from "./routes";
import 'react-toastify/dist/ReactToastify.css';
import { IntlProvider } from 'react-intl';

const locale = navigator.language || 'vn';

function App() {
  const queryClient = new QueryClient();
  return (
      <IntlProvider locale={locale}>
    <QueryClientProvider client={queryClient}>
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route element={<Layouts/>}>
          {NormalRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element}/>
          ))}
          </Route>
            {AuthRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element}/>
            ))}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
    </IntlProvider>
  );
}

export default App;
