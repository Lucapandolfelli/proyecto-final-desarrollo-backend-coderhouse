import http from "http";
import AxiosTest from "../classes/AxiosTest.js";
const axios = new AxiosTest("http://localhost", "/api/products");

// [GET] /api/products
const getAllProductsRequest = http.request(
  {
    hostname: "localhost",
    port: 3000,
    path: "/api/products",
    method: "GET",
  },
  (res) => {
    res.on("data", (data) => console.log(data));
  }
);

getAllProductsRequest.end();

// [GET] /api/products/:id
const getProductByIdRequest = http.request(
  {
    hostname: "localhost",
    port: 3000,
    path: "/api/products/636fe685f0d3bb557f15a974",
    method: "GET",
  },
  (res) => {
    res.on("data", (data) => console.log(data));
  }
);

getProductByIdRequest.end();
