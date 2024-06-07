import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { createAxios } from "../../utils/createIntance";
import icons from "../../utils/icons";
import { deleteProduct, getAllProducts } from "../../apis";
import { useNavigate } from "react-router";
import productsSlice from "../../store/productsSlice";
import Swal from "sweetalert2";
import DrawerComponent from '../Drawer/DrawerComponent' 
import { Col, Container, Form, FormGroup, Row } from "react-bootstrap";

const { MdEdit, MdDelete } = icons;

const AllProduct = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [load, isLoad] = useState(false);
  const [product, setProduct] = useState();

  const prodcuts = useSelector(
    (state) => state.products.getProducts.products.data
  );
  const deleteSucess = useSelector(
    (state) => state.products.getProducts?.success
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        deleteProduct(dispatch, id);

        Swal.fire("Chưa cho xóa!", "Your file has been deleted.", "success");
        isLoad(!load);
      }
    });
  };


  const handlerEditProduct = (item) => {
    setIsOpenDrawer(true)
    setProduct(item)
  };
  const convertJson = (item) => {
    const data = JSON.parse(item);
    return data[0];
  };
  useEffect(() => {
    getAllProducts(dispatch);
  }, [dispatch, navigate, deleteSucess, !load]);
  return (
    <div className="w-full min-h-screen mt-20 flex flex-col items-center container">
      <h2 className="text-3xl font-bold mb-4 text-center">
        Quản lý thành viên
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
                  <img
                    style={{ width: "200px" }}
                    src={convertJson(user.image).url}
                    alt=""
                  />
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
        title="Prodcut Detail"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="65%"
      >
        <Form >
          <FormGroup className="form__group">
            <span>Product Name</span>
            <input
              type="text"
              placeholder="Enter name product"
              value={product ? product.title : ""}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
            />
          </FormGroup>


           
          <button type="submit" className="buy__btn" >
            Save
          </button>
        </Form>
      </DrawerComponent>
      </div>
    </div>
  );
};

export default AllProduct;
