import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Main from "./layouts/Main";
import "./assets/sass/app.scss";
import React, { useEffect, useState } from "react";
import { GET_CART } from "./api/apiService";

function App(){
  return(
    <>
      <Header   />
      <Main/>
      <Footer/>
    </>
   
  );
}
export default App;