import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { GET_PAGE, GET_ID , POST_ID} from "../../api/apiService";
const GridContent = () => {
	const [products, setProducts] = useState([]);
	const[productId,setProductId]=  useState('');
	const [categories, setCategories] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const numItems = 8;
	const navigate = useNavigate();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const currentPage = parseInt(queryParams.get("page")) || 1;
	let categoryId = queryParams.get("categoryId");


	const handle=(row)=>{
		setProductId(row.id)
	}
	const handlePageChange = (page) => {
		navigate(`/ListingGrid?page=${page}&categoryId=${categoryId}`);
	};
	const handlePrevious = () => {
		if (currentPage > 1) {
			handlePageChange(currentPage - 1);
		}
	};
	const handleNext = () => {
		if (currentPage < totalPages) {
			handlePageChange(currentPage + 1);
		}
	};
	const renderPageNumbers = () => {
		const pageNumbers = [];
		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(
				<li
					key={i}
					class={`page-item ${currentPage === i ? "active" : ""}`}
				>
					<Link
						class="page-link"
						to={`?page=${i}&categoryId=${categoryId}`}
						onClick={(event) => handlePageChange(i, event)}
					>
						{i}
					</Link>
				</li>
			);
		}
		return pageNumbers;
	};
	useEffect(() => {
		if (categoryId === "null") {
		categoryId = null;
		}
		GET_PAGE(`product`, currentPage - 1, numItems, categoryId).then(
		(response) => {
		setProducts(response.data);
		console.log(response.data)
		const contentRangeHeader = response.headers["content-range"];
		console.log("header",contentRangeHeader);
		const [, totalItems] = contentRangeHeader.match(/\/(\d+)/);
		const calculatedTotalPages = Math.ceil(totalItems / numItems);
		setTotalPages(calculatedTotalPages);
		}
		);
		if (categoryId !== null) {
		GET_ID(`categories`, categoryId).then((item) => setCategories(item.data));
		} else {
		setCategories({ name: "Tất cả sản phẩm" });
		}
		POST_ID(`orderdetail`,productId);
		}, [categoryId, currentPage,productId]);
	return (

		<section class="section-content padding-y">
			<div class="container">
				<div class="card mb-3">
					<div class="card-body">
						<div class="row">
							<div class="col-md-2"> Bạn đang ở đây: </div>
							<nav class="col-md-8">

								<ol class="breadcrumb">
									<li class="breadcrumb-item">
										{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
										<a>Trang chủ</a>
									</li>
									<li class="breadcrumb-item">
										{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
										<a>{categories.name}</a>
									</li>
								</ol>
							</nav>
						</div>


					</div>
				</div>
				<header class="mb-3">
					<div class="form-inline">
						<strong class="mr-md-auto">Kết quả tiềm kiếm: </strong>
						<select class="mr-2 form-control">
							<option>Sản phẩm mới nhất</option>
							<option>Đang thịnh hành</option>
							<option>Phổ biến nhất</option>
							<option>Rẻ nhất</option>
						</select>
						<div class="btn-group">
							{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
							<a
								href="page-listing-grid.html"
								class="btn btn-light active"
								data-toggle="tooltip"
								title="Chế độ danh sách"
							>
								<i class="fa fa-bars"></i>
							</a>
							{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
							<a
								href="page-listing-large.html"
								class="btn btn-light"
								data-toggle="tooltip"
								title="Chế độ lưới"
							>
								<i class="fa fa-th"></i>
							</a>
						</div>
					</div>
				</header>
				<div class="row">
					{products.length >
						0 &&
						products.map((row) => (
							<div class="col-md-3">
								<figure class="card card-product-grid">
									<div class="img-wrap">
										<Link to={`/product-detail?productId=${row.id}`} class="img-wrap">
											<img src={`/images/products/${row.thumbnail}`} alt={row.title} />

										</Link>
									</div>
									{/*<!-- img-wrap.// -->*/}
									<figcaption class="info-wrap">
										{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
										<a href="#" class="title mb-2">
											{row.title}
										</a>
										<div class="price-wrap">
											<span class="price">{row.price}</span>
											<small class="text-muted">/mỗi sản phẩm</small>
										</div>
										{/*<!-- price-wrap.// -->*/}
										<p class="mb-2">
											2 Cái{" "}
											<small class="text-muted">(Số lượng tối thiểu)</small>
										</p>
										<p class="text-muted ">
											{row.description}
										</p>
										<p>
										<a href="#" class="btn btn-primary"  onClick={((event) => handle(row))} style={{height:"40px",marginTop:"10px"}}>
										<i class="fas fa-shopping-cart"></i>{" "}
										<span class="text">Add to cart</span>
										</a>
										</p>
										<hr />
										<label class="custom-control mb-3 custom-checkbox">
											<input type="checkbox" class="custom-control-input" />
											<div class="custom-control-label">
												Thêm vào so sánh
											</div>
										</label>
									</figcaption>
								</figure>
							</div>
						))}
				</div>
				{/*<!-- Hết dòng -->*/}
				<nav>
					<ul class="pagination">
						<li class={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
							<button
								class="page-link"
								onClick={handlePrevious}
								disabled={currentPage === 1}
							>
								Trang trước
							</button>
						</li>
						{renderPageNumbers()}
						<li
							class={`page-item ${currentPage === totalPages ? "disabled" : ""
								}`}
						>
							<button
								class="page-link"
								onClick={handleNext}
								disabled={currentPage === totalPages}
							>

								Trang sau
							</button>
						</li>
					</ul>
				</nav>
				<div class="box text-center">
					<p>Bạn đã tìm thấy điều bạn đang tìm kiếm chứ?</p>
					{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
					<a href="" class="btn btn-light">

						Có
					</a>
					{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
					<a href="" class="btn btn-light" style={{ marginLeft: "10px" }}>
						Không
					</a>
				</div>
			</div>
			{/*<!-- container .// -->*/}
		</section>
	);

};
export default GridContent