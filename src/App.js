import './App.css';
import { Outlet} from "react-router-dom";
import Header from './components/Header';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <>
      <Header/>
      <main className='py-3'>
        <Container>
          <Outlet/>
          {/* <Routes>
          <Route path="/" element={<HomeScreen/>} exact/>
          <Route path="/admin/products" element={<ProductiListScreen/>} exact/>
          <Route path="/admin/product/create" element={<ProductEditScreen/>}/>
          <Route path="/admin/users" element={<UserListScreen/>} exact/>
          <Route path="/admin/user/:id/edit" element={<UserEditScreen/>}/>          
          <Route path="/login" element={<LoginScreen/>} exact />
          <Route path="/order/:id" element={<OrderScreen/>} exact/>
          <Route path="/shipping" element={<ShippingScreen/>} exact/>
          <Route path="/payment" element={<PaymentScreen/>} exact/>
          <Route path="/placeorder" element={<PlaceOrderScreen/>} exact/>
          <Route path="/register" element={<RegisterScreen/>} exact/>
          <Route path="/profile" element={<ProfileScreen/>} exact/>      
          <Route path="/product/:id" element={<ProductScreen/> }/>
          <Route path="/cart/:id?" element={<CartScreen/>} exact/>
          <Route path="*" element={<PageNotFound/>} />
          <Route path="/test" element={<TestElement/>} exact/>
          
            
          </Routes> */}
        </Container>
      </main>
      </>
  );
}

export default App;
