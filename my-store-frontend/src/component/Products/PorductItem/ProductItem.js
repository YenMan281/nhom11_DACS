import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const ProductItem = ({ image, title, price, id, styles, pathHome }) => {
    const { currenPath } = useSelector((state) => state.products.getProducts)
    const navigate = useNavigate();
    let path = pathHome ? `${pathHome}/${id}` : `/${currenPath}/${id}`;

    const handleGetProductId = async (prodId) => {
        navigate(path);
    }

    return (
        <div className={`${styles ? styles : "768:w-1/4 w-1/2  pb-4 flex-col flex mt-5 bg-white rounded-lg  overflow-hidden 768:px-4 cursor-pointer group-hover: hover:scale-110 top-0 duration-300 hover:z-10 hover:shadow-md "}`}
            onClick={() => { handleGetProductId(id) }}
        >
            <div className='relative duration-500 h-[90%] overflow-hidden'>
                <img src={image[0]?.url} alt="thumbnail" className=' h-full w-full' />
                <img src={image[1]?.url} alt="thumbnail" className='hover:opacity-100 h-full w-full opacity-0 absolute top-0 left-0 duration-500' />
            </div>
            <div className='flex justify-between'>
                <h2 className='768:text-[15px] text-[10px] font-bold '>{title}</h2>
                <span className='font-bold text-[10px] 768:text-[14px] pr-5'>{price.toLocaleString('en-US', { style: 'currency', currency: 'VND' })}</span>
            </div>
        </div >
    )
}

export default ProductItem;