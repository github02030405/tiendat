import{
    List,Datagrid,TextField,Edit,SimpleForm,EditButton,TextInput,Create,
    ReferenceInput,
    SelectInput,
    NumberInput,
    DateInput,FileInput,FileField,
    ImageField,ReferenceManyField,SingleFieldList,
}from"react-admin";
import React from "react";
export const listProduct=(props)=>(
<List {...props}>
    <Datagrid style={{overflow:"auto"}}>
        <TextField source="id"/>
        <TextField source="title"/>
        <TextField source="price"/>
        <TextField source="discount"/>
        <ImageField source="thumbnail"/>
        <TextField source="description"/>
        <TextField source="created_at"/>
        <TextField source="updated_at"/>
        <TextField source="category.name"/>
        <EditButton/>
    </Datagrid>
</List>
)
export const editProduct=(props)=>(
    <Edit {...props}>
        
        <SimpleForm>
        <TextInput source="title"/>
                <NumberInput source="price"/>
                <NumberInput source="discount"/>
                <FileInput source="thumbnail" label="Thumbnail" accept="image/*">
                  <FileField source="src" title="title" />
              </FileInput>
                <TextInput source="description"/>
                <DateInput source="updated_at"/>
                <NumberInput source="deleted"/>
               
                </SimpleForm>
    </Edit>
)
export const createProduct=(props)=>(
        <Create {...props}>
            <SimpleForm>
                
            <TextInput source="title"/>
                <NumberInput source="price"/>
                <NumberInput source="discount"/>
                <FileInput source="thumbnail" label="Thumbnail" accept="image/*">
                  <FileField source="src" title="title" />
              </FileInput>
                <TextInput source="description"/>
                <DateInput source="updated_at"/>
                <NumberInput source="deleted"/>
                <ReferenceInput
                    label="Category"
                    source="category.id"
                    reference="categories">
                        <SelectInput optionText="name"/>
                </ReferenceInput>
                </SimpleForm>
        </Create>
        
        )