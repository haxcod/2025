import './App.css';
import Comments from './pages/Comments';
import Home from './pages/Home';
import My from './pages/My';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Products from './pages/Products';
import NewComment from './pages/NewComment';
import MyOrder from './pages/MyOrder';
import VipLevel from './pages/VipLevel';
import HelpCenter from './pages/HelpCenter';
import MyInfo from './pages/MyInfo';
import FundRecord from './pages/FundRecord';
import ResetPassword from './pages/ResetPassword';
import About from './pages/About';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
import BankCard from './pages/BankCard';
import Team from './pages/Team';
import Commission from './pages/Commission';
import ProductProfile from './pages/ProductProfile';
import Login from './pages/Login';
import Registration from './pages/Registration';
import ProtectedRoute from './ProtectedRoute';
import PaymentConfirmation from './components/PaymentConfirmation';

function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <ProtectedRoute><Home /></ProtectedRoute>,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Registration />,
    },
    {
      path: '/my',
      element: <ProtectedRoute><My /></ProtectedRoute>,
    },
    {
      path: '/comments',
      element: <ProtectedRoute><Comments /></ProtectedRoute>,
    },
    {
      path: '/postcomment',
      element: <ProtectedRoute><NewComment /></ProtectedRoute>,
    },
    {
      path: '/products',
      element: <ProtectedRoute><Products /></ProtectedRoute>,
    },
    {
      path: '/myorder',
      element: <ProtectedRoute><MyOrder /></ProtectedRoute>,
    },
    {
      path: '/viplevel',
      element: <ProtectedRoute><VipLevel /></ProtectedRoute>,
    },
    {
      path: '/help',
      element: <ProtectedRoute><HelpCenter /></ProtectedRoute>,
    },
    {
      path: '/myinfo',
      element: <ProtectedRoute><MyInfo /></ProtectedRoute>,
    },
    {
      path: '/fundrecord',
      element: <ProtectedRoute><FundRecord /></ProtectedRoute>,
    },
    {
      path: '/resetpassword',
      element: <ProtectedRoute><ResetPassword /></ProtectedRoute>,
    },
    {
      path: '/about',
      element: <ProtectedRoute><About /></ProtectedRoute>,
    },
    {
      path: '/deposit',
      element: <ProtectedRoute><Deposit /></ProtectedRoute>,
    },
    {
      path: '/withdraw',
      element: <ProtectedRoute><Withdraw /></ProtectedRoute>,
    },
    {
      path: '/bankcard',
      element: <ProtectedRoute><BankCard /></ProtectedRoute>,
    },
    {
      path: '/team',
      element: <ProtectedRoute><Team /></ProtectedRoute>,
    },
    {
      path: '/commission',
      element: <ProtectedRoute><Commission /></ProtectedRoute>,
    },
    {
      path: '/profile',
      element: <ProtectedRoute><ProductProfile /></ProtectedRoute>,
    },
    {
      path: '/successful',
      element: <ProtectedRoute><PaymentConfirmation/></ProtectedRoute>,
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
