// import React from "react";
// import{
//     List,Datagrid,TextField,Edit,SimpleForm,EditButton,TextInput,Create,
//     SelectInput,
//     DateInput,NumberInput,    
// }from"react-admin";
// export const listOrders=(props)=>(
// <List {...props}>
//     <Datagrid>
//         <TextField source="id"/>
//         <TextField source="order_date"/>
//         <TextField source="total_money"/>
//         <TextField source="user.fullname"/>
//         <TextField source="user.phone_number"/>

//         <EditButton/>
//     </Datagrid>
// </List>
// )
// export const editOrders=(props)=>(
//     <Edit {...props}>
//         <SimpleForm>
//             <DateInput source="order_date"/>
//               <NumberInput source="total_money"/>
//         </SimpleForm>
//     </Edit>
//     )
// export const createOrders=(props)=>(
//         <Create {...props}>
//             <SimpleForm>
//             <TextInput source="fullname"/>
//              <TextInput source="email"/>
//              <TextInput source="phone_number"/>
//              <TextInput source="address"/>
//             <DateInput source="order_date"/>
//               <NumberInput source="total_money"/>
//             <SelectInput source="isHome" choices={[
//                 {id:1,name:'hien thi o trang chu',value:1},
//                 {id:0,name:'an khoi trang chu',value:0},

//             ]}defaultValue={0}/>
                
//             </SimpleForm>
//         </Create>
//         )

import React from "react";
import {
    List, Datagrid, TextField, EditButton, ShowButton,
    SimpleForm, Edit, Create, DateInput, NumberInput, TextInput,
    Show, TabbedShowLayout, Tab, ReferenceManyField,SimpleShowLayout
} from "react-admin";

export const listOrders = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="order_date" />
            <TextField source="total_money" />
            <TextField source="user.fullname" />
            <TextField source="user.phone_number" />
            <EditButton />
            <ShowButton /> {/* thêm nút Show */}
        </Datagrid>
    </List>
);

export const editOrders = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <DateInput source="order_date" />
            <NumberInput source="total_money" />
        </SimpleForm>
    </Edit>
);

export const createOrders = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="fullname" />
            <TextInput source="email" />
            <TextInput source="phone_number" />
            <TextInput source="address" />
            <DateInput source="order_date" />
            <NumberInput source="total_money" />
        </SimpleForm>
    </Create>
);

export const showOrders = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      {/* Thông tin chính của Order */}
      <TextField source="id" />
      <TextField source="fullname" />
      <TextField source="email" />
      <TextField source="phone_number" />
      <TextField source="address" />
      <TextField source="status" />
      <TextField source="total_money" />

      {/* Danh sách order detail liên quan */}
      <ReferenceManyField reference="orderdetail" target="orderId">
        <Datagrid>
          <TextField source="id" />
          <TextField source="price" />
          <TextField source="num" />
          <TextField source="total_money" />
          <TextField source="product.title" />
        </Datagrid>
      </ReferenceManyField>
    </SimpleShowLayout>
  </Show>
);