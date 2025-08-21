import React, { useEffect, useState ,useRef} from "react";
import { GET_ID,POST_ID } from "../../api/apiService";
import { useLocation, Link } from "react-router-dom";
import { Carousel } from 'react-bootstrap';
const cardTextStyle = {
    maxWidth: "80%",
    };
const ProductDetail=()=>{
    const lastHash = useRef('');
    const [product,setProduct]=useState({});
    const location=useLocation();
    const queryParams=new URLSearchParams(location.search);
    const productId=parseInt(queryParams.get("productId"));
    useEffect(()=>{
        GET_ID(`product`,productId).then((item)=>setProduct(item.data));
        POST_ID(`orderdetail`,productId);
    },[productId]);
    useEffect(() => {
        // Smooth scrolling to target ID from URL hash
        if (location.hash) {
            lastHash.current = location.hash.slice(1);
            console.log( lastHash.current);
        }
        if (lastHash.current && document.getElementById(lastHash.current)) {
            setTimeout(() => {
                document
                  .getElementById(lastHash.current)
                  ?.scrollIntoView({ behavior: "smooth" });
                  lastHash.current = '';
            }, 100);
        }

    }, [location]);
    return (
        <section>
            <section class="py-3 bg-light">
            <div class="container">
            <ol class="breadcrumb">
            <li class="breadcrumb-item">
            <a>Home</a>
            </li>
            <li class="breadcrumb-item">
            <a>{product.category && product.category.name}</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
            {product.title}
            </li>
            </ol>
            </div>
            </section>
            <section class="section-content bg-white padding-y">
            <div class="container">
            <div class="row">
            <aside class="col-md-6">
            <div class="card">
            <article class="gallery-wrap">
            <Carousel fade>
            <Carousel.Item>
            <img id="product"
            class="d-block w-100"
            src={`/images/products/${product.thumbnail}`}
            alt={product.title}
            />
            </Carousel.Item>
            {product.galleries &&
            product.galleries.map((gallery) => (
             <Carousel.Item key={gallery.id}>
            <img id={gallery.id}
             class="d-block w-100"
             src={`data:image/png;base64,${gallery.imageData}`}
             alt={gallery.name}
            />
             </Carousel.Item>
            ))}
            </Carousel>
            <div class="thumbs-wrap">
            <Link to={`/product-detail?productId=${product.id}#product`} class="item-thumb">
            <img
                src={`/images/products/${product.thumbnail}`}
                alt={product.title}
            />
             </Link>
            {product.galleries &&
            product.galleries.length > 0 &&
            product.galleries.map((gallery) => (
            <Link to={`/product-detail?productId=${product.id}#${gallery.id}`} key={gallery.id} 
            class="item-thumb" >
             <img
             src={`data:image/png;base64,${gallery.imageData}`}
             alt={gallery.name}
            />
             </Link>
             ))}
            </div>
            </article>
            </div>
            </aside>
            <main class="col-md-6">
            <article class="product-info-aside">
            <h2 class="title mt-3">{product.title} </h2>
            <div class="rating-wrap my-3">
            <ul class="rating-stars">
            <li jstyle={cardTextStyle} class="stars-active">
            <i class="fa fa-star"></i> <i class="fa fa-star"></i>
            <i class="fa fa-star"></i> <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            </li>
            <li>
            <i class="fa fa-star"></i> <i class="fa fa-star"></i>
            <i class="fa fa-star"></i> <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            </li>
            </ul>
            <small class="label-rating text-muted">132 reviews</small>
            <small class="label-rating text-success">
            <i class="fa fa-clipboard-check"></i> 154 orders{" "}
            </small>
            </div>
            <div class="mb-3">
            <var class="price h4">{product.price}</var>
            <span class="text-muted">USD 562.65 incl. VAT</span>
            </div>
            <p>
            Compact sport shoe for running, consectetur adipisicing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
            aute irure dolor. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat{" "}
            </p>
            <dl class="row">
            <dt class="col-sm-3">Manufacturer</dt>
            <dd class="col-sm-9">
            <a href="#">Great textile Ltd.</a>
            </dd>
            <dt class="col-sm-3">Article number</dt>
            <dd class="col-sm-9">596 065</dd>
            <dt class="col-sm-3">Guarantee</dt>
            <dd class="col-sm-9">2 year</dd>
            <dt class="col-sm-3">Delivery time</dt>
            <dd class="col-sm-9">3-4 days</dd>
            <dt class="col-sm-3">Availabilty</dt>
            <dd class="col-sm-9">in Stock</dd>
            </dl>
            <div class="form-row mt-4">
            <div class="form-group col-md flex-grow-0">
            <div class="input-group mb-3 input-spinner">
            <div class="input-group-prepend">
            </div>
            </div>
            </div>
            <div class="form-group col-md">
            <a href="#" class="btn btn-primary">
            <i class="fas fa-shopping-cart"></i>{" "}
            <span class="text">Add to cart</span>
            </a>
            <a href="#" class="btn btn-light">
            <i class="fas fa-envelope"></i>{" "}
            <span class="text">Contact supplier</span>
            </a>
            </div>
            </div>
            </article>
            </main>
            </div>
            </div>
            </section>
            <section class="section-name padding-y bg">
            <div class="container">
            <div class="row">
            <div class="col-md-8">
            <h5 class="title-description">Description</h5>
            <p>

            Lava stone grill, suitable for natural gas, with cast-iron
            cooking grid, piezo ignition, stainless steel burners, water
            tank, and thermocouple. Thermostatic adjustable per zone. Comes
            complete with lava rocks. Adjustable legs. Lorem ipsum dolor sit
            amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.

            </p>
            <ul class="list-check">
            <li>Material: Stainless steel</li>
            <li>Weight: 82kg</li>
            <li>built-in drip tray</li>
            <li>Open base for pots and pans</li>
            <li>On request available in propane execution</li>
            </ul>
            <h5 class="title-description">Specifications</h5>
            <table class="table table-bordered">
            <tr>
            <th colspan="2">Basic specs</th>{" "}
            </tr>
            <tr>
            <td>Type of energy</td>
            <td>Lava stone</td>{" "}
            </tr>
            <tr>
            <td>Number of zones</td>
            <td>2</td>{" "}
            </tr>
            <tr>
            <td>Automatic connection </td>{" "}
            <td>
            <i class="fa fa-check text-success"></i> Yes{" "}
            </td>
            </tr>
            <tr>
            <th colspan="2">Dimensions</th>{" "}
            </tr>
            <tr>
            <td>Width</td>
            <td>500mm</td>{" "}
            </tr>
            <tr>
            <td>Depth</td>
            <td>400mm</td>{" "}
            </tr>
            <tr>
            <td>Height </td>
            <td>700mm</td>{" "}
            </tr>
            <tr>
            <th colspan="2">Materials</th>{" "}
            </tr>
            <tr>
            <td>Exterior</td>
            <td>Stainless steel</td>{" "}
            </tr>
            <tr>
            <td>Interior</td>
            <td>Iron</td>{" "}
            </tr>
            <tr>
            <th colspan="2">Connections</th>{" "}
            </tr>
            <tr>
            <td>Heating Type</td>
            <td>Gas</td>{" "}
            </tr>
            <tr>
            <td>Connected load gas</td>
            <td>15 Kw</td>{" "}
            </tr>
            </table>
            </div>
            <aside class="col-md-4">
            <div class="box">
            <h5 class="title-description">Files</h5>
            <p>

            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute
            irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt

            mollit anim id est laborum.
            </p>
            <h5 class="title-description">Videos</h5>
            <article class="media mb-3">
            <a href="#">
            <img class="img-sm mr-3" src="images/posts/3.jpg" />
            </a>
            <div class="media-body">
            <h6 class="mt-0">
            <a href="#">How to use this item</a>
            </h6>
            <p class="mb-2">

            Cras sit amet nibh libero, in gravida nulla. Nulla vel
            metus scelerisque ante sollicitudin{" "}

            </p>
            </div>
            </article>
            <article class="media mb-3">
            <a href="#">
            <img class="img-sm mr-3" src="images/posts/2.jpg" />
            </a>
            <div class="media-body">
            <h6 class="mt-0">
            <a href="#">New tips and tricks</a>
            </h6>
            <p class="mb-2">

            Cras sit amet nibh libero, in gravida nulla. Nulla vel
            metus scelerisque ante sollicitudin{" "}

            </p>
            </div>
            </article>
            <article class="media mb-3">
            <a href="#">
            <img class="img-sm mr-3" src="images/posts/1.jpg" />
            </a>
            <div class="media-body">
            <h6 class="mt-0">
            <a href="#">New tips and tricks</a>
            </h6>
            <p class="mb-2">

            Cras sit amet nibh libero, in gravida nulla. Nulla vel
            metus scelerisque ante sollicitudin{" "}

            </p>
            </div>
            </article>
            </div>
            </aside>
            </div>
            </div>
            </section>
        </section>
);
};
export default ProductDetail;
   
