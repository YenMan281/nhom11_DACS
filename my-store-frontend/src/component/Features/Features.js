import React from 'react'
import icons from "../../utils/icons"

const { AiOutlineShoppingCart, BsShieldCheck, CiMedal, BsCoin } = icons
const Features = () => {
    return (
        <div className='w-[80%] flex gap-5 my-20 justify-between'>
            <div className='flex flex-col justify-center items-center gap-3'>
                <AiOutlineShoppingCart size={40} />
                <span className='capitalize text-xs 768:text-lg font-semibold'>Giao Hàng Miễn Phí</span>
                <span className='hidden 768:flex text-[12px] text-[#a1a1a1] px-4 '>Trạng thái đơn hàng của bạn luôn được cập nhật chi tiết kể từ khi bạn đặt hàng</span>
            </div>
            <div className='flex flex-col justify-center items-center gap-3'>
                <BsShieldCheck size={40} />
                <span className='capitalize text-xs 768:text-lg font-semibold'>Thanh toán an toàn 100%</span>
                <span className='hidden 768:flex text-[12px] text-[#a1a1a1] px-4 '>Số tiền bạn thanh toán sẽ được chuyển đến người bán sau khi bạn nhận được hàng. Chúng tôi luôn bảo vệ bạn!</span>
            </div>
            <div className='flex flex-col justify-center items-center gap-3'>
                <CiMedal size={40} />
                <span className='capitalize text-xs 768:text-lg font-semibold'>Đảm bảo chất lượng</span>
                <span className='hidden 768:flex text-[12px] text-[#a1a1a1] px-4 '>Tận hưởng cảm giác mua sắm tuyệt vời với những sản phẩm chất lượng đến từ các Shop bán hàng uy tín</span>
            </div>
            <div className='flex flex-col justify-center items-center gap-3'>
                <BsCoin size={40} />
                <span className='capitalize text-xs 768:text-lg font-semibold'>Tiết kiệm - đảm bảo</span>
                <span className='hidden 768:flex text-[12px] text-[#a1a1a1] px-4 '>Tận hưởng các chương trình khuyến mãi hấp dẫn, siêu tiết kiệm đến từ các Shop bán hàng uy tín nhất.</span>
            </div>
        </div>
    )
}

export default Features;