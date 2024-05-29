/* eslint-disable array-callback-return */
import React, { useState } from 'react'
import Navigation from './Navigation/Navigation'
import icons from '../../utils/icons'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../apis';
import Swal from 'sweetalert2';
import { clearCart } from '../../store/cartSlice';

const { RiUserLine, AiOutlineHeart, BsCart, AiOutlineMenu, AiOutlineClose, IoIosContact, AiOutlineLogin, FiLogIn, AiOutlineHistory,
    AiOutlineLogout,
    CgUserList,
    BiCartAdd } = icons;

const Header = ({ onClickToggle, offset }) => {
    const [isShowNav, setIsShowNav] = useState(false);
    const [isShowLogin, setIsShowLogin] = useState(false);
    const user = useSelector(state => state.auth.login.currentUser)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartTotal, cartProducts } = useSelector(state => state.cart)

    const handlerToggoleMenu = () => {
        setIsShowNav(!isShowNav)
    }
    const handlerToggoleUser = () => {
        setIsShowLogin(!isShowLogin)
    }
    const handlerLogoutUser = () => {
        Swal.fire({
            title: 'Bạn chắc chắn muốn đăng xuất?',
            text: "Tất cả sản phẩm trong giỏ hàng ủa bạn sẽ bị xóa!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Vâng, đăng xuất!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(clearCart())
                logoutUser(dispatch);
                navigate("/login")
                Swal.fire(
                    'Đã đăng xuất!',
                    'Bạn đã đăng xuất thành công.',
                    'success'
                )
            }
        })
    }

    return (
        <div className='h-20 w-full flex justify-around pt-[14px]'>
            <div className='flex  gap-12 '>
                <span className='992:hidden cursor-pointer' onClick={handlerToggoleMenu}>
                    <AiOutlineMenu size={24} />
                </span>
                <div className='font-logo font-bold text-[27px] leading-7'>
                    <Link to="/"><h2 className='tracking-tighter'>Nội Thất LYM</h2></Link>
                </div>
                <nav className="hidden 992:flex font-logo font-bold text-[14px]  gap-4 pt-1  ">
                    <Navigation offset={offset} />
                </nav>
                {isShowNav &&
                    <nav className="flex font-logo font-bold text-sm cursor-pointer gap-4 pt-1 z-50 flex-col absolute left-0 top-0 items-center animate-slide-right bg-gray-100 bg-opacity-60 backdrop-blur-md w-full h-screen"
                        onClick={() => setIsShowNav(false)}
                    >
                        <div className="flex-1 flex flex-col justify-center items-center gap-6">
                            <Navigation offset={offset} />
                        </div>
                        <AiOutlineClose size={24} className="absolute right-0 top-0 m-4 cursor-pointer" onClick={() => setIsShowNav(false)} />
                    </nav>

                }
            </div>
            <div className='flex  768:gap-6 gap-2'>
                <span
                    className='w-[27px] h-[27px] relative cursor-pointer z-40'
                    onClick={() => { handlerToggoleUser() }}
                >
                    <RiUserLine size={18} className="font-bold absolute bottom-0 left-0" />
                    {isShowLogin &&
                        <div className='absolute top-full ml-[50%] -translate-x-[50%] 768:w-40 w-40 rounded-md shadow-md bg-[#e6e6e6]'>
                            {!user && <div className='flex flex-col py-5 text-justify'>
                                <Link className='flex items-center px-4 gap-2 py-2 hover:bg-[#b1b1b1]' to="/login"> <AiOutlineLogin size={20} />ĐĂNG NHẬP </Link>
                                <Link className='flex items-center px-4 gap-2 py-2 hover:bg-[#b1b1b1]' to="/signup"> <FiLogIn size={20} /> THOÁT</Link>
                            </div>}
                            {user && <div className='flex flex-col py-5 text-justify rounded-md text-black'>
                                <Link className='flex items-center px-4 gap-2 py-2 '> <IoIosContact size={20} /> Hi! {user.user.username}</Link>
                                <Link className='flex items-center px-4 gap-2 py-2 hover:bg-[#b1b1b1]' onClick={() => handlerLogoutUser()}> <AiOutlineLogout size={20} /> ĐĂNG XUẤT</Link>
                                <Link className='flex items-center px-4 gap-2 py-2 hover:bg-[#b1b1b1]' to="/order-history"> <AiOutlineHistory size={20} />ĐƠN HÀNG</Link>
                                {user?.user.admin && <Link className='flex items-center px-4 gap-2 py-2 hover:bg-[#b1b1b1]' to="/listusers" > <CgUserList size={20} /> QUẢN LÝ </Link>}
                                {user?.user.admin && <Link className='flex items-center px-4 gap-2 py-2 hover:bg-[#b1b1b1]' to="/add-products" > <BiCartAdd size={20} /> THÊM SẢN PHẨM</Link>}
                                {user?.user.admin && <Link className='flex items-center px-4 gap-2 py-2 hover:bg-[#b1b1b1]' to="/all-order" > <BiCartAdd size={20} /> QUẢN LÝ ĐƠN HÀNG</Link>}
                            </div>}
                        </div>

                    }
                </span>
                <Link className='w-[27px] h-[27px] relative'
                    onClick={onClickToggle}
                >
                    <BsCart size={18} className="font-bold absolute bottom-0 left-0" />
                    <span
                        className='absolute text-[9px] font-semibold tracking-wide w-[17px] h-[17px] bg-black text-white rounded-full flex items-center justify-center top-0 right-0'
                    >
                        {cartProducts.length === 0 ? "0" : cartTotal}
                    </span>
                </Link>
            </div >
        </div >
    )
}

export default Header