import React from 'react';
import{Admin,Resource, fetchUtils} from 'react-admin';
import AdminPanel from './component/AdminPanel';
import { listCategory,editCategory,createCategory } from './component/Category';
import { listProduct,editProduct,createProduct } from './component/Product';
import { listGallery,editGallery,createGallery } from './component/Gallery';
import { listOrders,editOrders,createOrders,showOrders } from './component/Orders';
import { listOrderDetail,editOrderDetail,createOrderDetail } from './component/OrderDetail';
import { listUser,editUser,createUser } from './component/User';
import { listInforUser,editInforUser } from './component/InforUser';
import dataProvider from './component/customDataProvider';
const App =()=>(
  <Admin dashboard={AdminPanel}
  dataProvider ={dataProvider}
  >
    <Resource 
    name ="product" 
    list={listProduct}
    edit={editProduct}
    create={createProduct}/>

    <Resource 
    name ="categories" 
    list={listCategory}
    edit={editCategory}
      create={createCategory}
    />
<Resource 
    name ="user" 
    list={listUser}
    edit={editUser}
    create={createUser}
    
    />
<Resource 
    name ="gallery" 
    list={listGallery}
    edit={editGallery}
      create={createGallery}
    />
<Resource 
      name="orders" 
    list={listOrders}
    edit={editOrders}
    create={createOrders}
    show={showOrders}
    />
    <Resource 
    name ="orderdetail" 
    list={listOrderDetail}
    edit={editOrderDetail}
    create={createOrderDetail}
    />
     <Resource 
    name ="address" 
    list={listInforUser}
    edit={editInforUser}
    />
    </Admin>
);
export default App;