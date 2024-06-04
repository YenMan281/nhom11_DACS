import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import productsSlice from '../../store/productsSlice';
import bg from "../../assets/img/background.jpg"

const Slider = () => {
    const dispatch = useDispatch();
    const handlerSetProductType = (productType) => {
        dispatch(productsSlice.actions.getProducts(productType))
    }
    return (
        <div className='h-full bg-[#CACACA] pt-[85px] flex flex-col gap-5 text-center'>
            <div className='font-logo font-bold text-[300px] leading-[300px] tracking-slider text-[#00000020]'>L Y M</div>
            <div className='font-logo font-bold text-[300px] leading-[300px] tracking-slider'>L Y M</div>
            <img src={bg} alt='bg' className='absolute top-0 z-10 w-full h-full object-cover'  />
            <div className='absolute 768:top-[40%] top-1/4 mx-[10%] translate-x-1/4 768:ml-[25%] flex flex-col  text-white  p-5 gap-4 z-20 items-center rounded-md duration-500 animate-slide-right'>
                <div className=''>
                    <div className='768:text-[88px] text-[72px] leading-none font-bold uppercase tracking-tightest'>TINH TẾ</div>
                    <div className='768:text-[88px] text-[72px] leading-none font-bold uppercase tracking-tightest'>SANG TRỌNG</div>
                </div>
                <span className='font-semibold text-[14px] uppercase'>NỘI THẤT CHẤT LƯỢNG - MẪU MÃ MỚI - GIÁ TỐT NHẤT  </span>
                <Link
                    to="/sofa"
                    className='rounded-full border-2 border-white w-3/5 py-2 hover:bg-white hover:text-black capitalize'
                    onClick={() => { handlerSetProductType("sofa") }}
                >
                    Bắt đầu mua sắm
                    &#8594;
                </Link>
            </div>
        </div>
    )
}

export default Slider; 