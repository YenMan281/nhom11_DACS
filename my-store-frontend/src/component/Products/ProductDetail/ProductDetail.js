import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import * as ReactDOM from 'react-dom';

import * as apis from "../../../apis"
import ProductItem from '../PorductItem/ProductItem';
import { addToCart, getCartTotal } from '../../../store/cartSlice';
import Swal from 'sweetalert2';
import Loading from '../../../UI/Loading';

const ProductDetail = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const { catelory, id } = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState([]);
    const { currenProducts } = useSelector(state => state.products.getProducts)
    const { currentUser } = useSelector(state => state.auth.login)
    const { cartProducts } = useSelector(state => state.cart)
    const [isFetching, setIsFetching] = useState(false)

    useEffect(() => {
        const fetchDetailProduct = async () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsFetching(true);
            const response = await apis.getProductDetail(catelory, id);
            setIsFetching(false);
            console.log(response?.data?.data);
            setProduct(response?.data?.data)
        }
        fetchDetailProduct()
    }, [catelory, id]);

    const handlerAddToCart = () => {
        if (currentUser) {
            let total = 1;
            for (let i = 0; i < cartProducts?.length; i++) {
                total += cartProducts[i].quantity;
            }
            dispatch(addToCart({ id: id, quantity: 1 }))
            dispatch(getCartTotal(total))
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Bạn chưa đăng nhập!',
                text: 'Vui lòng đăng nhập!',
                footer: '<a href="/login">Đi tới trang đăng Login</a>'
            })
        }
    }
    const handleSelectSize = () => {
        Swal.fire({
            title: 'Tính năng đang được uppdate thêm!',
            width: 500,
            padding: '3em',
            color: '#000',
            background: '#fff',
            backdrop: `
              rgba(0,0,123,0.4)
            `
        })
    }
    let productsExtend = currenProducts?.filter(prod => prod.price === product?.price)
    return (
        <div className='w-full flex flex-col items-center my-6 gap-9 mt-20'>
            <div className='768:w-[70%] w-[95%] max-768:w-[90%] 768:flex max-768:flex-col gap-6'>
                <div className='768:w-1/2 flex flex-col items-center gap-4'>
                    <Swiper
                        style={{
                            "--swiper-navigation-color": "#fff",
                            "--swiper-pagination-color": "#fff",
                        }}
                        loop={true}
                        spaceBetween={10}
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="h-[80%] w-full"
                    >
                        {product?.image && JSON.parse(product.image)?.map((item) =>
                            <SwiperSlide key={item.id}>
                                <img src={item.url} alt="slider" />
                            </SwiperSlide>
                        )}

                    </Swiper>
                    <span className='w-full h-[1px] bg-black'></span>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        loop={true}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="h-[20%] w-full"
                    >
                        {product?.image && JSON.parse(product.image)?.map((item) =>
                            <SwiperSlide key={item.id}>
                                <img src={item.url} alt="slider" />
                            </SwiperSlide>
                        )}

                    </Swiper>
                </div>
                <div className='flex flex-col w-full gap-5'>
                    <h2 className='text-[28px] font-bold'>{product?.title}</h2>
                    <span className='w-1/5 h-[1px] bg-black my-4'></span>
                    <p className='text-[24px] font-bold'>
                        {product?.price?.toLocaleString('en-US', { style: 'currency', currency: 'VND' })}
                    </p>
                    {/* <p className='text-[20px] font-bold'>please seclect size</p>
                    <div className='flex gap-2'>
                        <button className='w-[35px] h-[35px] border-2 rounded-md border-black font-bold focus:bg-[#ccc]' onClick={() => handleSelectSize()}>S</button>
                        <button className='w-[35px] h-[35px] border-2 rounded-md border-black font-bold focus:bg-[#ccc]' onClick={() => handleSelectSize()}>M</button>
                        <button className='w-[35px] h-[35px] border-2 rounded-md border-black font-bold focus:bg-[#ccc]' onClick={() => handleSelectSize()}>L</button>
                    </div> */}
                    <span>Số lượng còn lại: <strong>{product?.total}</strong></span>
                    <div className='flex gap-4'>
                        <button
                            type="submit"
                            className='min-w-[160px] bg-black  text-white rounded-md border-2 border-black hover:bg-white hover:text-black cursor-pointer'
                            onClick={handlerAddToCart}
                        >
                         Thêm vào giỏ hàng
                        </button>
                        {/* <button className='min-w-[135px] bg-black text-white rounded-md border-2 border-black hover:bg-white hover:text-black cursor-pointer' >Hỗ trợ!</button> */}
                    </div>
                    <span className='w-full h-[1px] bg-black my-4'></span>
                    <figure className='flex flex-col gap-4'>
                        <span className='font-semibold text-xl'>Thông tin sản phẩm</span>
                        <span>{product?.description}</span>
                    </figure>
                </div>
            </div>
            <div className='flex flex-col gap-4 768:w-[70%] w-[95%] justify-start  '>
                <h2 className='font-bold text-[24px]'>Các sản phẩm tương tự </h2>
                <div className='flex flex-wrap'>
                    {productsExtend?.map(prod =>
                        <ProductItem
                            key={prod.id}
                            image={JSON.parse(prod.image)}
                            title={prod.title}
                            price={prod.price}
                            id={prod.id}
                            styles="w-1/4 cursor-pointer " />
                    )}
                </div>
            </div>
            {isFetching && ReactDOM.createPortal(<Loading />, document.getElementById("loading"))}
        </div >
    )
}

export default ProductDetail