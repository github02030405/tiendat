import{
    List,Datagrid,TextField,Edit,SimpleForm,EditButton,TextInput,Create,
    ReferenceInput,
    SelectInput,
    ImageField,
    DateInput,FileInput,FileField
}from"react-admin";
import React from "react";
export const listUser=(props)=>(
<List {...props}>
    <Datagrid style={{overflow:"auto"}}>
        <TextField source="id"/>
        <TextField source="fullname"/>
        <TextField source="email"/>
        <TextField source="phone_number"/>
        <TextField source="address"/>
        <TextField source="password"/>
        <TextField source="create_at"/>
        <TextField source="updated_at"/>
        <ImageField
                source="thumbnail"
                title="User Thumbnail"
            />
        <EditButton/>
    </Datagrid>
</List>
)
export const editUser=(props)=>(
    <Edit {...props}>
        
        <SimpleForm>
        <TextInput source="fullname"/>
        <TextInput source="email"/>
        <TextInput source="phone_number"/>
        <TextInput source="address"/>
        <TextInput source="password"/>
        <DateInput source="create_at"/>
        <DateInput source="updated_at"/>
        <FileInput source="thumbnail" label="Thumbnail" accept="image/*">
                  <FileField source="src" title="title" />
        </FileInput>
        </SimpleForm>
    </Edit>
)
export const createUser=(props)=>(
        <Create {...props}>
              <SimpleForm>
              <TextInput source="fullname"/>
        <TextInput source="email"/>
        <TextInput source="phone_number"/>
        <TextInput source="address"/>
        <TextInput source="password"/>
        <DateInput source="create_at"/>
        <DateInput source="updated_at"/>
                <FileInput source="thumbnail" label="Thumbnail" accept="image/*">
                  <FileField source="src" title="title" />
              </FileInput>
                </SimpleForm>
        </Create>
        
        )