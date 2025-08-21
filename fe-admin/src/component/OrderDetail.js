import React from "react";
import{
    List,Datagrid,TextField,Edit,SimpleForm,EditButton,TextInput,Create,
    SelectInput,
    NumberInput,    
}from"react-admin";
export const listOrderDetail=(props)=>(
<List {...props}>
    <Datagrid>
        <TextField source="id"/>
        <TextField source="price"/>
        <TextField source="num"/>
        <TextField source="total_money"/>
        <TextField source="product.title"/>
        <TextField source="order.id"/>
        <EditButton/>
    </Datagrid>
</List>
)
export const editOrderDetail=(props)=>(
    <Edit {...props}>
        <SimpleForm>
        <TextInput source="price"/>
        <NumberInput source="num"/>
        <NumberInput source="total_money"/>
        </SimpleForm>
    </Edit>
    )
export const createOrderDetail=(props)=>(
        <Create {...props}>
            <SimpleForm>
            <TextInput source="price"/>
             <NumberInput source="num"/>
             <NumberInput source="total_money"/>
            </SimpleForm>
        </Create>
        )