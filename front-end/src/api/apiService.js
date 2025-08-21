import axios from "axios";

let API_URL = "http://localhost:8080/api";

async function callApi(endpoint , method = "GET" ,body) {
    try {
        return await axios(
            {
                method,
                url: `${API_URL}/${endpoint}`,
                data: body,
            });
    } catch (e) {
        console.log(e);
    }
}
async function callapipost(endpoint , method = "POST" ,body) {
    try {
        return await axios(
            {
                method,
                url: `${API_URL}/${endpoint}`,
                data: body,
                withCredentials: true,
               
            });
    } catch (e) {
        console.log(e);
    }
}
export function PUT_CART (endpoint,id,data) {
    return callapipost(endpoint+"/"+id,"PUT" ,data);
}
export function POST_CART(endpoint){
    return callapipost(endpoint  , "POST");
}
export function DELETE_CARTID(endpoint,id){
    return callapipost(endpoint + "/" + id , "DELETE");
}
export function GET_CARTACOUNT(endpoint){
    return callapipost(endpoint,"GET");
}
export function GET_CART(endpoint){
    return callapipost(endpoint,"GET");
}
export function GET_ALL(endpoint){
    return callApi(endpoint,"GET");
}
export function POST_ID(endpoint,id){
    return callapipost(endpoint + "/" + id , "POST");
}
export function GETSESSION(endpoint){
    return callApi(endpoint,"GET");
}
export function GET_PAGE(endpoint,page = 0 , size = 10 ,categoryId = null){
    let url =  `${endpoint}?page=${page}&size=${size}`;

    if (categoryId !== null){
             url += `&categoryId=${categoryId}` ; 
    }
    return callApi(url,"GET");
}

export function GET_SEARCH(endpoint,name){
    let url =  `${endpoint}?title=${name}`;
    return callApi(url,"GET");
}
export function GET_ID(endpoint,id)
{
    return callApi(endpoint + "/" + id , "GET");
}
export function POST_ADD(endpoint , data) {
    return callApi(endpoint , "POST" ,data);
}
export function GETUser(endpoint , data) {
    return callApi(endpoint , "GET" ,data);
}
export function PUT_ADD (endpoint,data) {
    return callApi(endpoint,"PUT" ,data);
}
export function DELETE_ID(endpoint) {
    return callApi(endpoint,"DELETE");
}
