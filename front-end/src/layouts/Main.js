import React from 'react'
import {Routes,Route} from 'react-router-dom';
import Home from './Home'
import ListingGrid from './ListingGird';
import Product from './Product';
import Address from './Address';
import Register from './Register';
import ProfileAddress from './ProfileAddress';
import ProfileOrders from './ProfileOrders';
import ProfileSetting from './ProfileSetting';
import Login from "./Login"
import Cart from './Cart';
import CreateAddress from '../pages/address/CreateAddress';
import UpdateAddress from '../pages/address/UpdateAddress';
import LayoutSearch from './Search';
const Main =()=>(
    <main>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="ListingGrid" element={<ListingGrid/>}/>
            <Route path="product-detail" element={<Product/>}/>
            <Route path="Address" element={<Address/>}/>
            <Route path="Register" element={<Register/>}/>
            <Route path="Login" element={<Login/>}/>
            <Route path="ProfileAddress" element={<ProfileAddress/>}/>
            <Route path="ProfileOrders" element={<ProfileOrders/>}/>
            <Route path="ProfileSetting" element={<ProfileSetting/>}/>
            <Route path="Cart" element={<Cart/>}/>
            <Route path="fromAddress" element={<CreateAddress/>}/>
            <Route path="UpdateAddress" element={<UpdateAddress/>}/>
            <Route path="Search" element={<LayoutSearch/>}/>
            
        </Routes>
    </main>
)
export default Main