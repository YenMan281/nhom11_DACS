const Products = require("../models/products");
const cloudinary = require("../../cloudinary");
const fs = require("fs");
const Product = require("../models/products");

exports.postAddProduct = async(req, res, next) => {

    try {
        const uploader = async(path) => await cloudinary.uploads(path, "node-mystore")
        const urls = [];
        if (req.method === "POST") {
            console.log(req.files)
            const files = req.files;
            for (const file of files) {
                const { path } = file;
                const newPath = await uploader(path);
                urls.push(newPath);
                fs.unlinkSync(path);
            }
        } else {
            res.status(405).json({
                err: "error"
            })
        }
        const title = req.body.title;
        const price = req.body.price;
        const image = JSON.stringify(urls);
        const description = req.body.description;
        const total = req.body.total;
        const category = req.body.category;
        const id = req.body.id;
        console.log(req.body.id);
        const response = await Products.create({
            title: title,
            image: image,
            price: price,
            description: description,
            total: total,
            category: category,
            userId: id
        });
        res.status(200).json({
            message: "Thêm thành công",
            data: {
                title: response.title,
                image: response.image,
                price: response.price,
                description: response.description,
                total: response.total,
                category: response.category
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Có lỗi xảy ra khi thêm sản phẩm"
        });
    }
}

exports.getProductById = async (req, res, next) => {
  try {
    await Product.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((product) => {
        console.log(product);
        res.status(200).json({
          message: "successfully",
          data: product,
        });
      })
      .catch((err) => console.log(err));
  } catch (err) {
    return res.status(500).json(req);
  }
};

exports.removeProduct = async (req, res) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json("deleted");
  } catch (err) {
    return res.status(500).json(req);
  }
};

exports.updateProduct = async (req, res) => {
    console.log(req.body);
    try {
      await Product.update(
        {
          title: req.body.title,
          price: req.body.price,
          total: req.body.total,
          image: req.body.image,
          description: req.body.description,
          category: req.body.category
        },
        {
          where: {
            id: req.body.id,
          },
        }
      );
      return res.status(200).json("updated");
    } catch (err) {
      console.error(err);  // Log the error to understand what went wrong
      return res.status(500).json({ error: "An error occurred while updating the product" });
    }
  };
  
