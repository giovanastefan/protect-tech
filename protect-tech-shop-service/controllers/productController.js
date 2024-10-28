const productModel = require("../models/productModel");

exports.getAllProducts = (req, res) => {
  productModel
    .getAllProducts()
    .then((products) => {
      const formattedResult = products.map((item) => ({
        productId: item.product_id,
        name: item.name,
        price: item.price,
        promotionalPrice: item.promotional_price,
        description: item.description,
        imageUrl: item.image_url,
      }));

      res.json(formattedResult);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

exports.getProductDetailsById = (req, res) => {
  const { id: productId } = req.params;
  productModel
    .getProductDetailsById(productId)
    .then((result) => {
      if (result.length === 0) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(result);
    })
    .catch((err) => {
      console.error("Error fetching product details:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

exports.allOrderByProductId = (req, res) => {
  const { id: productId } = req.params;
  productModel
    .getAllOrdersByProductId(productId)
    .then((result) => {
      if (result.length === 0) {
        return res
          .status(404)
          .json({ error: "No orders found for this product" });
      }
      res.json(result);
    })
    .catch((err) => {
      console.error("Error fetching orders for product:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

exports.createProduct = (req, res) => {
  const { name, price, promotionalPrice, description, imageUrl } = req.body;

  if (!name || !price || !description || !imageUrl) {
    return res.status(400).json({ error: "Missing required product fields" });
  }

  productModel
    .createProduct({ name, price, promotionalPrice, description, imageUrl })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error("Error creating product:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

exports.updateProduct = (req, res) => {
  const { id: productId } = req.params;
  const { name, price, promotionalPrice, description, imageUrl } = req.body;

  if (!name || !price || !description || !imageUrl) {
    return res.status(400).json({ error: "Missing required product fields" });
  }

  productModel
    .updateProduct(productId, {
      name,
      price,
      promotionalPrice,
      description,
      imageUrl,
    })
    .then((result) => {
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json({ message: "Product updated successfully" });
    })
    .catch((err) => {
      console.error("Error updating product:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

exports.deleteProduct = (req, res) => {
  const { id: productId } = req.params;

  // Fail A01 - Broken Access Control: There is no authorization check to verify if the user is an admin
  // before allowing them to delete a product. Any authenticated user could potentially delete any product
  // by directly calling this endpoint, regardless of their permissions. Access control should be enforced
  // on the server side to ensure that only users with the appropriate privileges can perform this action.

  productModel
    .deleteProduct(productId)
    .then((result) => {
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json({ message: "Product deleted successfully" });
    })
    .catch((err) => {
      console.error("Error deleting product:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

exports.searchProducts = async (req, res) => {
  const searchQuery = req.query.q;

  // A03: Injection - The searchQuery is directly embedded in the SQL query without any validation or sanitization.
  // This exposes the application to SQL Injection attacks, allowing an attacker to manipulate the query
  // and potentially gain unauthorized access to data or execute harmful SQL commands.

  if (!searchQuery) {
    return res.status(400).json({ error: "A search query is required" });
  }

  try {
    const products = await productModel.searchProducts(searchQuery);

    const formattedProducts = products.map((product) => ({
      productId: product.product_id,
      name: product.name,
      price: product.price,
      promotionalPrice: product.promotional_price,
      description: product.description,
      imageUrl: product.image_url,
    }));

    res.status(200).json(formattedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error", error });
  }
};
