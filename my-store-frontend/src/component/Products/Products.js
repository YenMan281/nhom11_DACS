import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import * as ReactDOM from 'react-dom';

import * as apis from "../../apis"
import ProductItem from './PorductItem/ProductItem'
import productsSlice from '../../store/productsSlice'
import Loading from '../../UI/Loading';

const Products = () => {
    const { category } = useSelector((state) => state.products.getProducts)
    const [products, setProducts] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const location = useLocation();
    const dispatch = useDispatch()
    let path = location.pathname.slice(1);

    useEffect(() => {
        const fetchProducts = async () => {
            dispatch(productsSlice.actions.setCrurrentPath(path))
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsFetching(true);
            const response = await apis.getProducts(category);
            setIsFetching(false);
            dispatch(productsSlice.actions.setCurrenProducts(response.data.data))
            setProducts(response.data.data)
        }
        fetchProducts();
    }, [category, path, dispatch])

    return (
        <>
            {
                !isFetching && products && <div className='768:w-4/5 w-[95%] h-full flex-wrap flex mb-10 mt-20'>
                    {products?.map(product =>
                        <ProductItem
                            key={product.id}
                            image={JSON.parse(product?.image)}
                            price={product.price}
                            title={product.title}
                            total={product.total}
                            description={product.description}
                            id={product.id}
                        />
                    )}
                </div>
            }
            {
                !isFetching && products.length === 0 && <h1 className='font-bold text-center w-full h-screen text-3xl animate-pulse'>No products! Please switch to another tab</h1>
            }
            {isFetching && ReactDOM.createPortal(<Loading />, document.getElementById("loading"))}
        </>
    )
}

export default Products