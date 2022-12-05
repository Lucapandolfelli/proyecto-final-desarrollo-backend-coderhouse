import { expect } from "chai";
import supertest from "supertest";

let request;

describe("Test Products API", () => {
  before(async () => {
    request = supertest("http://localhost:3000/api/products");
  });

  // [GET] /api/products
  describe("[GET] /api/products", () => {
    it("should return status code 200 and all products", async () => {
      const response = await request.get("/");
      expect(response.status).to.eql(200);
    });
  });

  // [GET] /api/products/:id
  describe("[GET] /api/products/:id", () => {
    it("should return status code 200 and response's product should have the same passed id", async () => {
      const id_prod = "636fe685f0d3bb557f15a974";
      const response = await request.get(`/${id_prod}`);
      expect(response.status).to.eql(200);
      expect(response.body._id).to.eql(id_prod);
    });
  });

  // [POST] /api/products
  describe("[POST] /api/products", () => {
    it("should return status code 201 and should add a new product", async () => {
      const newProduct = {
        title: "Producto test",
        description: "Descripción del producto test",
        code: "test",
        thumbnail: "producto.jpg",
        price: 1000,
        stock: 2,
      };
      const response = await request.post("/").send(newProduct);
      expect(response.status).to.eql(201);
      const { createdProduct } = response.body;
      expect(createdProduct).to.include.keys(
        "title",
        "description",
        "code",
        "thumbnail",
        "price",
        "stock"
      );
      expect(createdProduct.title).to.eql(newProduct.title);
      expect(createdProduct.description).to.eql(newProduct.description);
      expect(createdProduct.code).to.eql(newProduct.code);
      expect(createdProduct.thumbnail).to.eql(newProduct.thumbnail);
      expect(createdProduct.price).to.eql(newProduct.price);
      expect(createdProduct.stock).to.eql(newProduct.stock);
    });
  });

  // [PUT] /api/products/:id
  describe("[PUT] /api/products/:id", () => {
    it("should return status code 200 and should update the product with _id: 637d93b131af9d7b7c45f469", async () => {
      const product = {
        title: "Producto test nuevo",
        description: "Descripción del producto test",
        code: "test",
        thumbnail: "producto.jpg",
        price: 1000,
        stock: 2,
      };
      const response = await request
        .put("/637d93b131af9d7b7c45f469")
        .send(product);
      expect(response.status).to.eql(200);
      const { newProduct } = response.body;
      expect(newProduct).to.include.keys(
        "title",
        "description",
        "code",
        "thumbnail",
        "price",
        "stock"
      );
      expect(newProduct.title).to.eql(product.title);
      expect(newProduct.description).to.eql(product.description);
      expect(newProduct.code).to.eql(product.code);
      expect(newProduct.thumbnail).to.eql(product.thumbnail);
      expect(newProduct.price).to.eql(product.price);
      expect(newProduct.stock).to.eql(product.stock);
    });
  });

  // [DELETE] /api/products/:id
  describe("[DELETE] /api/products/:id", () => {
    it("should return status code 200 and should delete the product with _id: 637d94a2790601a42a221637", async () => {
      const id_prod = "637d94a2790601a42a221637";
      const response = await request.delete(`/${id_prod}`);
      expect(response.status).to.eql(200);
      expect(response.body.message).to.eql("Deleted.");
    });
  });
});
