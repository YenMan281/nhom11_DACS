import React, { useEffect, useMemo, useState } from "react";
import icons from "../../utils/icons";
import { useDispatch, useSelector } from "react-redux";
import productsSlice from "../../store/productsSlice";
import { clearCart, getCartTotal, removeFromCart } from "../../store/cartSlice";
import { useNavigate } from "react-router";
import { orderProducts } from "../../apis/order";
import { deleteProduct, getAllProducts, updateProduct } from "../../apis";
import Swal from "sweetalert2";
import { createAxios } from "../../utils/createIntance";
import authslice from "../../store/authSlice";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const { AiOutlineClose, AiFillDelete } = icons;

const Cart = ({ onClickToggle, pathHome }) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  const { currenPath } = useSelector((state) => state.products.getProducts);
  const { currentUser } = useSelector((state) => state.auth.login);

  useEffect(() => {
    const loadProducts = async () => {
      const response = await getAllProducts();
      console.log(response);
      setProducts(response.data);
    };
    loadProducts();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      const response = await getAllProducts();
      setProducts(response.data);
    };
    loadProducts();
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState({
    phoneNumber: "",
    address: "",
    note: "",
  });

  let requestJWT = createAxios(
    currentUser,
    dispatch,
    authslice.actions.loginSuccess
  );

  const navigate = useNavigate();

  const cartProductsWithDetails = useMemo(() => {
    return cartProducts?.map((cartProduct) => {
      // eslint-disable-next-line eqeqeq
      const product = products.find((product) => product.id == cartProduct.id);
      console.log(product);
      return { ...cartProduct, ...product };
    });
  }, [cartProducts, products]);

  const handleGetProductId = async (prodId) => {
    let path = `/${currenPath}/${prodId}`;
    navigate(path);
  };

  const handlerClearCart = () => {
    Swal.fire({
      title: "Bạn có chắc không?",
      text: "Bạn sẽ không thể hoàn nguyên điều này!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Vâng, xóa nó!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearCart());
        dispatch(getCartTotal(0));
        Swal.fire("Đã xóa!", "Giỏ hàng của bạn đã được xóa.", "success");
      }
    });
  };

  const handleAddOrder = () => {
    let total = 0;
    console.log(cartProductsWithDetails);
    cartProductsWithDetails.forEach(
      (product) => (total += product.price * product.quantity)
    );
    const cartOrder = {
      userId: currentUser.user.id,
      total,
      products: cartProducts,
      phoneNumber: address.phoneNumber,
      address: address.address,
      note: address.note,
    };
    console.log(cartOrder);
    if (cartProducts.length > 0) {
      Swal.fire({
        title: "Bạn có chắc không?",
        text: "Bạn sẽ không thể hoàn nguyên điều này!",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Vâng, Mua hàng!",
      }).then((result) => {
        if (result.isConfirmed) {
          orderProducts(cartOrder, dispatch, currentUser.token, requestJWT);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Hoàn thành!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Giỏ hàng trống!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handlerRevomeFromCart = (e, id) => {
    e.stopPropagation();
    Swal.fire({
      title: "Bạn có chắc không?",
      text: "Bạn sẽ không thể hoàn nguyên điều này!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Vâng, xóa nó!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromCart(id));
        Swal.fire("Đã xóa!", "Sản phẩm của bạn đã bị xóa.", "success");
      }
    });
  };

  const onCloseModal = () => {
    setIsOpen(false);
  };
  const onOpenModal = () => {
    console.log(cartProductsWithDetails);
    setIsOpen(true);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setAddress((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  console.log(products);

  return (
    <>
      <div className="w-full bg-[#ccc] h-full relative">
        <span
          className="top-3 flex justify-end cursor-pointer font-bold hover:opacity-80 p-3"
          onClick={() => onClickToggle()}
        >
          <AiOutlineClose size={24} />
        </span>
        <div className="px-4">
          <h2 className="font-bold text-xl">Thông tin giỏ hàng : </h2>
          <hr className="border-[#333] border-1" />
        </div>
        <div className="flex flex-col gap-2 mt-5 h-5/6 overflow-auto">
          {cartProductsWithDetails?.map((product) => (
            <div
              className="flex gap-4 cursor-pointer hover:bg-[#b9b9b9] p-4 duration-200 justify-between"
              key={product.id}
              onClick={() => handleGetProductId(product.id)}
            >
              <div className="flex gap-2">
                <div className="w-20 rounded-md overflow-hidden">
                  <img
                    src={product.image && JSON.parse(product.image)?.[0].url}
                    alt="thumnail"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-bold">{product.title}</h2>
                  <p className="text-[#00000070]">
                    Số lượng:{" "}
                    <span className="font-bold">{product.quantity}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => handlerRevomeFromCart(e, product.id)}
                className=""
              >
                <AiFillDelete
                  size={20}
                  title="Remove Product"
                  className="hover:opacity-70 cursor-pointer"
                />
              </button>
            </div>
          ))}
          {currentUser && cartProducts.length === 0 && (
            <h1 className="m-4 text-xl font-semibold">
              Bạn chưa thêm bất kì sản phẩm nào!
            </h1>
          )}
          {!currentUser && cartProducts.length === 0 && (
            <h1 className="m-4 text-xl font-semibold">Bạn chưa đăng nhập!</h1>
          )}
        </div>
        <div className="flex justify-around gap-4 absolute bottom-0 w-full m-4">
          <button
            className="flex-1 bg-black text-white py-3"
            // onClick={(e) => handleAddOrder(e)}
            onClick={onOpenModal}
          >
            ĐẶT HÀNG
          </button>
          <button
            className="flex-1 bg-black text-white py-3"
            onClick={handlerClearCart}
          >
            LOẠI BỎ
          </button>
        </div>
      </div>
      <Modal open={isOpen} onClose={onCloseModal} center>
        <div className="w-[400px] flex flex-col gap-6">
          <div className="text-xl font-semibold">Nhập địa chỉ giao hàng</div>
          <div>
            <div className="flex gap-2 flex-col">
              <label>Số điện thoại</label>
              <input
                name="phoneNumber"
                onChange={handleChange}
                className="h-10 border rounded-md "
                type="text"
              />
            </div>
            <div className="flex gap-2 flex-col">
              <label>Địa chỉ</label>
              <input
                name="address"
                onChange={handleChange}
                className="h-10 border rounded-md "
                type="text"
              />
            </div>
            <div className="flex gap-2 flex-col">
              <label>Ghi chú</label>
              <input
                name="note"
                onChange={handleChange}
                className="h-10 border rounded-md "
                type="text"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleAddOrder}
              className="h-10 bg-violet-600 font-semibold text-base text-white rounded-lg shadow-lg px-4"
            >
              Đặt hàng
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Cart;
