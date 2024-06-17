import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import icons from "../../utils/icons";
import { deleteProduct, getAllProducts, updateProduct } from "../../apis";
import Swal from "sweetalert2";
import DrawerComponent from "../Drawer/DrawerComponent";

const { MdEdit, MdDelete } = icons;

const AllProduct = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [load, isLoad] = useState(false);
  const [product, setProduct] = useState();
  const [prodcuts, setProdcuts] = useState([]);

  const editProduct = () => {
    updateProduct(product);
    setIsOpenDrawer(false);
    isLoad(!load);
    console.log(load);
  };
  const handlerDeleteUser = (id) => {
    Swal.fire({
      title: "Bạn chắc chắn muốn xóa sản phẩm này?",
      text: "Bạn sẽ không thể hoàn điều này!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Vâng, xóa nó!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id);

        Swal.fire("Xoá Thành Công!", "Your file has been deleted.", "success");
        isLoad(!load);
      }
    });
  };

  const handlerEditProduct = (item) => {
    setIsOpenDrawer(true);
    setProduct(item);
  };
  const convertJson = (item) => {
    const data = JSON.parse(item);
    return data[0];
  };
  useEffect(() => {
    const loadProducts = async () => {
      const response = await getAllProducts();
      console.log(response);
      setProdcuts(response.data);
    };
    loadProducts();
    console.log(prodcuts);
  }, [load]);
  return (
    <div className="w-full min-h-screen mt-20 flex flex-col items-center container">
      <h2 className="text-3xl font-bold mb-4 text-center">
        Quản lý Sản Phẩm
      </h2>
      <div className="overflow-x-auto w-full">
        <table className="table-auto border-collapse w-full">
          <thead className="border-b-2">
            <tr className="h-12 text-lg font-bold text-gray-700">
              <th></th>
              <th className="px-4 py-2">TÊN</th>
              <th className="px-4 py-2">GIÁ </th>
              <th className="px-4 py-2">SỐ LƯỢNG</th>
              <th className="px-4 py-2 text-center">MÔ TẢ</th>
              <th className="px-4 py-2 text-center">LOẠI</th>
              <th className="px-4 py-2 text-center">NGÀY TẠO</th>
              <th className="px-4 py-2 text-center">Xóa</th>
              <th className="px-4 py-2 text-center">Sữa</th>
            </tr>
          </thead>
          <tbody>
            {prodcuts?.map((user, index) => (
              <tr
                className={`h-12 ${index % 2 !== 0 ? "bg-gray-100" : ""}`}
                key={user.id}
              >
                <td className="">
                  <img style={{ width: "200px" }} src={convertJson(user.image).url} alt="" />
                </td>
                <td className="px-4 py-2  text-center">{user.title}</td>
                <td className="px-4 py-2  text-center">{user.price}</td>
                <td className="px-4 py-2  text-center">{user.total}</td>
                <td className="px-4 py-2  text-center">{user.description}</td>
                <td className="px-4 py-2  text-center">{user.category}</td>

                <td className="px-4 py-2 text-center">
                  {moment(user.updatedAt).utc().format("DD-MM-YYYY")}
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handlerDeleteUser(user?.id)}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-3 py-1 focus:outline-none"
                  >
                    <MdDelete title="Delete user" />
                  </button>
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handlerEditProduct(user)}
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-3 py-1 focus:outline-none"
                  >
                    <MdEdit title="Delete user" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <DrawerComponent
          title="CHi TIẾT SẢN PHẨM"
          isOpen={isOpenDrawer}
          onClose={() => setIsOpenDrawer(false)}
          width="50%"
        >
          <div className="flex flex-col gap-3">
            <label className="text-lg">Tên Sản phẩm </label>
            <input
              className="border p-1"
              type="text"
              name="title"
              value={product ? product.title : ""}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-lg">Giá</label>
            <input
              className="border p-1"
              type="number"
              name="price"
              step="0.01"
              value={product ? product.price : 0}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-lg">Hình Ảnh</label>
            <input
              className="border p-1"
              type="file"
              id="file"
              name="image"
              multiple
            />
          </div>
          <div className="flex flex-col gap-3">
            <label>Mô tả</label>
            <textarea
              className="border p-1"
              type="text"
              name="description"
              value={product ? product.description : ""}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-lg">Số Lượng</label>
            <input
              className="border p-1"
              type="number"
              name="total"
              value={product ? product.total : 0}
              onChange={(e) =>
                setProduct({ ...product, total: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-3">
            <label>Phân Loại</label>
            <select
              name="category"
              className="border p-1"
              value={product ? product.category : ""}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
            >
              <option value="sofa" key="sofa">
                SOFA
              </option>
              <option value="bantrangdiem" key="bantrangdiem">
                BÀN TRANG ĐIỂM
              </option>
              <option value="tudo" key="tudo">
                TỦ ĐỒ
              </option>
              <option value="banan" key="banan">
                BÀN ĂN
              </option>
              <option value="banlamviec" key="banlamviec">
                BÀN LÀM VIỆC
              </option>
              <option value="giuongngu" key="giuongngu">
                GIƯỜNG NGỦ
              </option>
            </select>
          </div>
          <button
            type="submit"
            className="border p-3 bg-blue-500 text-white rounded-md"
            onClick={editProduct}
          >
            SỮA SẢN PHẨM
          </button>
        </DrawerComponent>
      </div>
    </div>
  );
};

export default AllProduct;
