import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';
import './App.css';
import { Products, ProductDetail, AllUser, AddProduct, OrderHistory, AllOrder,AllProduct } from './component';
import { Home, Login, Public, Signup } from './page/public';
import path from './utils/path'

function App() {

  const user = useSelector(state => state.auth.login.currentUser)
  return (
    <>
      <Routes>
        <Route path={path.PUBLIC} element={<Public />} >
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.SOFA} element={<Products />} />
          <Route path={path.bantrangdiem} element={<Products />} />
          <Route path={path.tudo} element={<Products />} />
          <Route path={path.banan} element={<Products />} />
          <Route path={path.banlamviec} element={<Products />} />
          <Route path={path.Giuongngu} element={<Products />} />
          <Route path={path.PRODUCTDETAIL} element={<ProductDetail />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.SIGNUP} element={<Signup />} />
          {user?.user?.admin && <Route path={path.ALL_USERS} element={<AllUser />} />}
          {user?.user?.admin && <Route path={path.ALL_PRODUCT} element={<AllProduct />} />}
          <Route path={path.ADMIN_ADD_PRODUCTS} element={<AddProduct />} />
          <Route path={path.ORDER_HISTORY} element={<OrderHistory />} />
          <Route path={path.ALL_ORDER} element={<AllOrder />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
