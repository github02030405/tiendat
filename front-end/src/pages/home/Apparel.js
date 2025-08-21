import React from "react";

const Apparel = () => (
    <section class="padding-bottom">
      
         <div class="card card-deal">
            <div class="row">
                <div class="row-heading content-body">
                    <header class="section-heading">
                        <h3 class="section-title">Hot Selling Products</h3>
                        <p>Frequently purchased products</p>
                    </header>
                </div>
                <div class="row col-8 no-gutters items-wrap">
                    <div class="col-md col-6" >
                        <figure class="card-product-grid card-sm">
                            <a href="http://localhost:3000/product-detail" class="img-wrap">
                                <img src={require("../../assets/images/items/1.jpg")} alt="#" />
                            </a>
                            <div class="text-wrap p-3">
                                <a href="http://localhost:3000/product-detail" class="title">In no jitsury okusha ni nar</a>
                                <span class="badge badge-danger"> -20% </span>
                            </div>
                        </figure>
                    </div>
                    <div class="col-md col-6">
                        <figure class="card-product-grid card-sm">
                            <a href="http://localhost:3000/product-detail" class="img-wrap">
                                <img src={require("../../assets/images/items/2.jpg")} alt="#" />
                            </a>
                            <div class="text-wrap p-3">
                                <a href="#" class="title">Ryoushin no Shakkin wo</a>
                                <span class="badge badge-danger"> -5% </span>
                            </div>
                        </figure>
                    </div>
                    <div class="col-md col-6">
                        <figure class="card-product-grid card-sm">
                            <a href="#" class="img-wrap">
                                <img src={require("../../assets/images/items/3.jpg")} alt="#" />
                            </a>
                            <div class="text-wrap p-3">
                                <a href="#" class="title">Kết hôn với đứa con gái mà tôi cực ghét trong lớp.</a>
                                <span class="badge badge-danger"> -20% </span>
                            </div>
                        </figure>
                    </div>
                </div>
            </div>
            <div class="image-container">
            <div class="text-overlay">

            </div>
          
        </div>
           
        </div>

    </section>
);

export default Apparel