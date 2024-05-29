import React from 'react'
import { Link } from 'react-router-dom';
import icons from '../../utils/icons';

const { TiSocialFacebook, AiFillGithub, TiSocialPinterest, TiSocialDribbble, TiSocialTwitter } = icons;

const Footer = () => {
    return (
        <div className='bg-black w-[80%] flex flex-col my-20'>
            <div className='flex justify-center'>
                <div className='text-white 768:w-1/3 flex flex-col items-center gap-5'>
                    <div className='font-bold text-[60px] tracking-slider text-center '>Nội Thất LYM</div>
                    <div className='flex gap-4 text-[28px] justify-center'>
                        <Link to="https://facebook.com/manhcuong.apk" target="_blank">
                            <TiSocialFacebook />
                        </Link >
                        <Link to="https://github.com/cuong07" target="_blank">
                            <AiFillGithub />
                        </Link>
                        <Link>
                            <TiSocialPinterest />
                        </Link>
                        <Link>
                            <TiSocialDribbble />
                        </Link>
                        <Link>
                            <TiSocialTwitter />
                        </Link>
                    </div>
                </div>
                <div className='w-2/3 768:flex hidden '>
                    <div className='w-[30%] text-white flex flex-col gap-4'>
                        <h2 className='uppercase text-[16px] font-bold'>LIÊN HỆ </h2>
                        <div className='flex flex-col'>
                            <span className='text-[#A1A1A1] text-[14px]'>TRANG CHỦ</span>
                            
                            <span className='text-[#A1A1A1] text-[14px]'>ƯU ĐÃI</span>
                            <span className='text-[#A1A1A1] text-[14px]'>DỊCH VỤ</span>
                            <span className='text-[#A1A1A1] text-[14px]'>LIÊN HỆ VỚI CỬA HÀNG</span>
                            <span className='text-[#A1A1A1] text-[14px]'>HOTLINE: 0946499909 </span>
                        </div>
                    </div>
                    <div className='w-[30%] text-white flex flex-col gap-4'>
                        <h2 className='uppercase text-[16px] font-bold'>HỆ THỐNG SHOWROOM</h2>
                        <div className='flex flex-col'>
                            <span className='text-[#A1A1A1] text-[17px]'> ĐC: 736 NGUYỄN TRẢI -</span>
                            <span className='text-[#A1A1A1] text-[17px]'>P3 - Q5 - HCMC</span>
                            <span className='text-[#A1A1A1] text-[17px]'>ĐC: 280 NGUYEN HUE -</span>
                            <span className='text-[#A1A1A1] text-[17px]'>P1 - Q1 - HCMC</span>
                        </div>
                    </div>
                    <div className='w-[30%] text-white flex flex-col gap-4'>
                        <h2 className='uppercase text-[16px] font-bold'>THÔNG TIN </h2>
                        <div className='flex flex-col'>
                            <span className='text-[#A1A1A1] text-[17px]'>NỘI THẤT LYM  là thương hiệu chuyên phân phối các dòng sản phẩm nội thất cao cấp như ghế sofa, bàn ăn, giường ngủ, bàn trang điểm. Chúng tôi luôn định hướng tập trung vào chất lượng sản phẩm cũng như quy trình bán hàng nhằm mang lại trải nghiệm chuyên nghiệp, tiện nghi cho quý khách hàng. </span>
                            {/* <span className='text-[#A1A1A1] text-[14px]'>Shipping</span>
                            <span className='text-[#A1A1A1] text-[14px]'>Product returns</span>
                            <span className='text-[#A1A1A1] text-[14px]'>FAQs</span>
                            <span className='text-[#A1A1A1] text-[14px]'>Checkout</span>
                            <span className='text-[#A1A1A1] text-[14px]'>other Issues</span> */}
                        </div>
                    </div>
                </div>
            </div>
            <span className='w-full h-[1px] bg-gray-400 mt-20 mb-10'></span>
            <div className='text-white flex justify-between mb-30'>
                <span className='text-[10px] text-[#A1A1A1]'>
                    &#169; 2024@NOITHATLYM.
                </span>
                <span className='text-[10px] text-[#A1A1A1]'>
                    Design by 
                </span>
            </div>
        </div >
    )
}

export default Footer;