const Products = require('../models/products')

exports.getProducts = (req, res) => {
    Products.findAll({ where: { category: req.params.category } })
        .then((products) => {
            res.status(200).json({
                message: "succsesfully",
                data: products
            })
        })
        .catch((err) => { console.log(err) })
}

exports.getDetailProduct = (req, res) => {
    Products.findOne({ where: { id: req.params.id } })
        .then((product) => {
            console.log(product);
            res.status(200).json({
                message: "successfully",
                data: product
            })
        })
        .catch(err => console.log(err))
}

exports.getAllProducts = async (req, res, next) => {
    Products.findAll()
        .then((product) => {
            res.status(200).json({
                message: "successfully",
                data: product
            })
        })
        .catch(err => console.log(err))
}
// Hàm xóa sản phẩm
exports.deleteProduct = (req, res) => {
    Products.destroy({ where: { id: req.params.id } })
        .then((deleted) => {
            if (!deleted) {
                return res.status(404).json({
                    message: "Không tìm thấy sản phẩm"
                });
            }
            res.status(200).json({
                message: "Xóa sản phẩm thành công"
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                message: "Xóa sản phẩm thất bại",
                error: err.message
            });
        });
};
