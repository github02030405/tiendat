import React from "react";
import{
    List,Datagrid,TextField,Edit,SimpleForm,EditButton,TextInput,Create,
    SelectInput,    ImageField
}from"react-admin";
export const listInforUser=(props)=>(
<List {...props}>
    <Datagrid>
        <TextField source="id"/>
        <TextField source="fullname"/>
        <TextField source="address"/>
        <TextField source="phone_number"/>
        <TextField source="date"/>
        <TextField source="user.fullname"/>
        <ImageField
                source="user.thumbnail"
                title="User Thumbnail"
            />
        <EditButton/>
    </Datagrid>
</List>
)
export const editInforUser=(props)=>(
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="fullname"/>
            <TextInput source="address"/>
            <TextInput source="phone_number"/>
        </SimpleForm>
    </Edit>
    )