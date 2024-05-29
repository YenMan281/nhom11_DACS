import React, { useEffect } from 'react'
import { Features, HomeProducts, Slider } from '../../component';
import bgSale from "../../assets/img/Rectangle.png"
import { getAllProducts } from '../../apis';
import { useDispatch } from 'react-redux';
import productsSlice from '../../store/productsSlice';
const Home = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchProducts = async () => {
            const products = await getAllProducts();
            dispatch(productsSlice.actions.getAllProducts(products.data.data))
        }
        fetchProducts();
    }, [dispatch])
    return (
        <>
            <div className='w-full'>
                <div className='h-[90%] overflow-hidden relative'>
                    <Slider />
                </div>
                <div className='flex justify-center'>
                    <Features />
                </div>
                <div className='flex justify-center'>
                    <HomeProducts />
                </div>
                <div className='relative'>
                    <img src={bgSale} alt="Sale" />
                    <div className='absolute z-10 top-1/4 pl-[50%] -translate-x-[25%] hidden 768:flex text-white gap-10 '>
                        <p className='flex flex-col'>
                            <span className="text-[66px] font-sale font-semibold">NHẬN NGAY <strike className='italic'>20%</strike> <strong>GIẢM GIÁ</strong> LẦN ĐẦU MUA </span>
                            <span>ĐĂNG KÝ NGAY ĐỂ KHÔNG BỎ LỠ BẤT KỲ ƯU ĐÃI NÀO </span>
                        </p>
                        <form className='flex flex-col mt-8 gap-6'>
                            <input type="email" placeholder='your email address' required className='px-3 py-1 rounded-md outline-none text-black' />
                            <button type='submit' className='bg-black duration-300 hover:bg-white hover:text-black border-2 px-3 py-1 rounded-md border-black'>ĐĂNG KÝ NGAY</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;