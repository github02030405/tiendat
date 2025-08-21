// import { fetchUtils } from "react-admin";
// const apiUrl = "http://localhost:8080/api";
// const httpClient = fetchUtils.fetchJson;
// const dataProvider = {
// // getList: (resource, params) => {
// // const { page, perPage } = params.pagination;
// // const url = `${apiUrl}/${resource}?page=${page - 1}&size=${perPage}`;
// // return httpClient(url).then(({ headers, json }) => ({
// // data: json,
// // total: parseInt(headers.get("content-range").split("/").pop(), 10),
// // }));
// // },
// getList:(resource, params) => {
//   const { page, perPage } = params.pagination;
//   const url = `${apiUrl}/${resource}?page=${page - 1}&size=${perPage}`;
//   return httpClient(url).then(({ headers, json }) => ({
//       data: json,
//       total: parseInt(headers.get("content-range").split("/").pop(), 10),
//   }));
// },
// create: (resource, params) => {
//     const url = `${apiUrl}/${resource}`;
//     const formData = new FormData();
//     const { thumbnail, ...Data } = params.data;
//     const requiredImageResources=["product","user"]
//     if (resource === "gallery") {
//       const { name, product } = params.data; // Extract name (file) and product from params.data

//       // Append the product ID as a separate field (if needed, but it's not necessary for your backend)
//       formData.append("file", name.rawFile); // Assuming 'name' is the FileInput field containing the uploaded file

//       // Construct the URL with the product ID from the reference
//       const url = `${apiUrl}/${resource}/${product.id}`; // Use product.id to match your @PostMapping("{id}")
//       return fetch(url, {
//           method: "POST",
//           body: formData, // Let the browser set Content-Type with boundary automatically
//       }).then(response => response.json())
//       .catch(error => {
//         console.error("Error uploading:", error);
//         throw new Error();
//     });
//     }
//     if (requiredImageResources.includes(resource) && (!thumbnail || !thumbnail.rawFile)) {
//         alert("Vui lòng tải ảnh lên để tiếp tục.");
//         return Promise.reject("Hình ảnh là bắt buộc cho tài nguyên này.");
//     }
//     formData.append(resource, new Blob([JSON.stringify(Data)], { type: "application/json" }));
    
//     if (thumbnail?.rawFile) {
//         formData.append("file", thumbnail.rawFile);
//         return fetch(url, {
//             method: "POST",
//             body: formData,
//         })
//             .then(response => response.json())
//             .then(json => ({ data: json }))
//             .catch(error => {
//                 console.error("Error uploading:", error);
//                 throw new Error("Failed to upload product.");
//             });
//     }
//             else{
//                 return httpClient(url, {
//                     method: "POST",
//                     body: JSON.stringify(params.data),
//                     }).then(({ json }) => ({ data: json }));
//                     }
// },
// update: (resource, params) => {
//     const url = `${apiUrl}/${resource}/${params.id}`;
//     const formData = new FormData();
//     const { thumbnail, ...Data } = params.data;
//     const requiredImageResources=["product","user","gallery"];
//     if (thumbnail?.rawFile) {
//         formData.append("file", thumbnail.rawFile);
//         formData.append(resource, new Blob([JSON.stringify(Data)], { type: "application/json" }));
//         return fetch(url, {
//             method: "PUT",
//             body: formData, 
//         })
//             .then(response => response.json())
//             .then(json => ({ data: json }))
//             .catch(error => {
//                 console.error("Error updating with file:", error);
//                 throw new Error("Failed to update product with file.");
//             });
//     }
//     if (requiredImageResources.includes(resource)){
//         formData.append(resource, new Blob([JSON.stringify(Data)], { type: "application/json" }));
//         return fetch(url, {
//             method: "PUT",
//             body: formData, 
//         })
//             .then(response => response.json())
//             .then(json => ({ data: json }))
//             .catch(error => {
//                 console.error("Error updating with file:", error);
//                 throw new Error("Failed to update product with file.");
//             });
//     }
//      else {
//         return httpClient(url, {
//             method: "PUT",
//             body: JSON.stringify(params.data),
//             headers: new Headers({ "Content-Type": "application/json" }),
//         })
//             .then(({ json }) => ({ data: json }))
//             .catch(error => {
//                 console.error("Error updating without file:", error);
//                 throw new Error("Failed to update product without file.");
//             });
//     }
   
// },
// delete: (resource, params) => {
//     const url = `${apiUrl}/${resource}/${params.id}`;
//     return httpClient(url, {
//         method: "DELETE",
//     })
// },
// getMany: (resource, params) => {
// const { ids } = params;
// const url = `${apiUrl}/${resource}?ids=${ids.join(",")}`;
// return httpClient(url).then(({ json }) => ({ data: json }));
// },
// getOne: (resource, params) => {
// const { id } = params;
// const url = `${apiUrl}/${resource}/${id}`;
// return httpClient(url).then(({ json }) => ({ data: json }));
// },
// };
// export default dataProvider;

import { fetchUtils } from "react-admin";

const apiUrl = "http://localhost:8080/api";
const httpClient = fetchUtils.fetchJson;

const dataProvider = {
    // Lấy danh sách (có phân trang)
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const url = `${apiUrl}/${resource}?page=${page - 1}&size=${perPage}`;
        return httpClient(url).then(({ headers, json }) => {
            const contentRange = headers.get("content-range");
            const total = contentRange
                ? parseInt(contentRange.split("/").pop(), 10)
                : json.length; // fallback nếu backend chưa set header
            return {
                data: json,
                total,
            };
        });
    },

    // Lấy 1 bản ghi
    getOne: (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },

    // Lấy nhiều bản ghi theo id
    getMany: (resource, params) => {
        const url = `${apiUrl}/${resource}?ids=${params.ids.join(",")}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },

    // Tạo mới
    create: (resource, params) => {
        const url = `${apiUrl}/${resource}`;
        const formData = new FormData();
        const { thumbnail, ...Data } = params.data;

        // Xử lý riêng cho gallery
        if (resource === "gallery") {
            const { name, product } = params.data;
            formData.append("file", name.rawFile);
            return fetch(`${url}/${product.id}`, {
                method: "POST",
                body: formData,
            })
                .then((res) => res.json())
                .then((json) => ({ data: json }));
        }

        // Nếu có file ảnh
        if (thumbnail?.rawFile) {
            formData.append("file", thumbnail.rawFile);
            formData.append(resource, new Blob([JSON.stringify(Data)], { type: "application/json" }));
            return fetch(url, { method: "POST", body: formData })
                .then((res) => res.json())
                .then((json) => ({ data: json }));
        }

        // Không có file ảnh → gửi JSON
        return httpClient(url, {
            method: "POST",
            body: JSON.stringify(params.data),
            headers: new Headers({ "Content-Type": "application/json" }),
        }).then(({ json }) => ({ data: json }));
    },

    // Cập nhật
    update: (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        const formData = new FormData();
        const { thumbnail, ...Data } = params.data;

        if (thumbnail?.rawFile) {
            formData.append("file", thumbnail.rawFile);
            formData.append(resource, new Blob([JSON.stringify(Data)], { type: "application/json" }));
            return fetch(url, { method: "PUT", body: formData })
                .then((res) => res.json())
                .then((json) => ({ data: json }));
        }

        return httpClient(url, {
            method: "PUT",
            body: JSON.stringify(params.data),
            headers: new Headers({ "Content-Type": "application/json" }),
        }).then(({ json }) => ({ data: json }));
    },

    // Xoá
    delete: (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        return httpClient(url, { method: "DELETE" });
    },
};

export default dataProvider;