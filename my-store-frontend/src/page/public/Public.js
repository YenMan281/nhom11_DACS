import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import { Cart, Footer, Header } from '../../component'

const Public = () => {
    const [offset, setOffset] = useState(0);
    const [isShowCart, setIsShowCart] = useState(false);

    useEffect(() => {
        const onScroll = () => setOffset(window.pageYOffset);
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);


    return (
        <div className='flex flex-col h-max relative top-0'>
            <div className={` w-full fixed top-0 left-0 right-0 z-30 border-b border-b-[#00000020] duration-200 ${offset > 0 ? "bg-[#000000] text-white mt-0 border-b-0 shadow-xl" : ""} `}>
                <Header offset={offset} onClickToggle={() => setIsShowCart(!isShowCart)} />
            </div>
            <div className='w-full h-full flex flex-col items-center'>
                <Outlet />
            </div>
            {isShowCart &&
                <div className='768:w-1/3 w-full fixed h-screen right-0 z-50 animate-slide-left '>
                    <Cart onClickToggle={() => setIsShowCart(!isShowCart)} />
                </div>
            }
            <div className='w-full max-h-max flex justify-center bg-black'>
                <Footer />
            </div>
        </div>
    )
}

export default Public