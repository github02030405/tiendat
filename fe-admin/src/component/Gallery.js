import{
    List,Datagrid,TextField,Edit,SimpleForm,EditButton,TextInput,Create,
    ImageField,ReferenceInput,SelectInput,
    FileInput,FileField
}from"react-admin";
import React from "react";
export const listGallery=(props)=>(
<List {...props}>
    <Datagrid style={{overflow:"auto"}}>
        <TextField source="id"/>
        <TextField source="product.title"/>
        <ImageField source="name"/>
        <EditButton/>
    </Datagrid>
</List>
)
export const editGallery=(props)=>(
    <Edit {...props}>
        
        <SimpleForm>
        <ReferenceInput
                    label="Product"
                    source="product.id"
                    reference="product">
                        <SelectInput optionText="title"/>
                </ReferenceInput>
         <FileInput source="name" label="name" accept="image/*">
                  <FileField source="src" title="title" />
         </FileInput>
               
        </SimpleForm>
    </Edit>
)
export const createGallery=(props)=>(
        <Create {...props}>
           <SimpleForm>
           <ReferenceInput
                    label="Product"
                    source="product.id"
                    reference="product">
                        <SelectInput optionText="title"/>
                </ReferenceInput>
         <FileInput source="name" label="name" accept="image/*">
                  <FileField source="src" title="title" />
         </FileInput>
        </SimpleForm>
        </Create>
        )