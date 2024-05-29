import React, { useEffect, useState } from 'react'
import moment from 'moment/moment';
import * as ReactDOM from 'react-dom';

import { getOrderHistory } from '../../apis/order'
import { useDispatch, useSelector } from 'react-redux'
import { createAxios } from '../../utils/createIntance';
import authslice from '../../store/authSlice';
import icons from '../../utils/icons';
import Loading from '../../UI/Loading';

const { SlArrowDown,
    SlArrowUp } = icons

const OrderHistory = () => {
    const { currentUser } = useSelector(state => state.auth.login);
    const { products } = useSelector(state => state.products.getProducts)
    console.log(products);
    const { isFetching } = useSelector(state => state.order.getOrder)
    const [orders, setOrders] = useState([]);
    const [ordersList, setOrdersList] = useState([]);
    const dispatch = useDispatch();
    const [selectedOrderIds, setSelectedOrderIds] = useState([]);
    let requestJWT = createAxios(currentUser, dispatch, authslice.actions.loginSuccess);

    useEffect(() => {
        getOrderHistory(dispatch, currentUser?.token, requestJWT)
            .then((response) => {
                setOrders(response.data?.data);
            })
            .catch((err) => console.log(err))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser])

    const handleToggleDetailCart = (orderId) => {
        if (selectedOrderIds.includes(orderId)) {
            setSelectedOrderIds(prevState => prevState.filter(id => id !== orderId));
        } else {
            setSelectedOrderIds(prevState => [...prevState, orderId]);
        }
    }

    useEffect(() => {
        const orderProductsDetail = orders?.map(order => {
            let totalPrice = 0;
            const orderDetail = order.map(item => {
                const orderItem = products.find(product => product.id == item.productId);
                totalPrice = totalPrice + (orderItem?.price * item?.quantity);
                return { ...item, ...orderItem, totalPrice: totalPrice }
            })
            return orderDetail;
        })
        setOrdersList(orderProductsDetail);
    }, [orders, products])

    console.log(ordersList);
    const handleSumTotalPrice = (arr) => {
        let totalCartPrice = 0;
        arr.map(item => totalCartPrice += item.totalPrice)
        return totalCartPrice;
    }

    return (
        <div className='min-h-screen w-full gap-4 flex flex-col items-center my-20'>
            <p className='font-bold text-2xl capitalize'>Lịch sử mua hàng</p>
            {ordersList?.map((order, index) => (
                <div className='w-full 768:w-3/5 border-collapse border rounded-md duration-500 shadow-md flex flex-col gap-3 p-4 cursor-pointer' key={index} onClick={() => handleToggleDetailCart(order[0].orderId)}>
                    <div className='flex justify-between items-center '>
                        <span>Giỏ hàng thứ: {index + 1}</span>
                        <span className='text-gray-400 text-sm'>{moment(order[0]).format("DD-MM-YYYY")}</span>
                        <span>
                            {selectedOrderIds.includes(order[0].orderId) ? <SlArrowUp /> : <SlArrowDown />}
                        </span>
                    </div>
                    {selectedOrderIds.includes(order[0].orderId) && (
                        order.map((product) => (
                            <div key={product.id} className='px-4 flex gap-4 duration-1000 animate-slide-left2'>
                                {console.log(product)}
                                <img src={product && JSON.parse(product?.image)[0]?.url} alt='thumbnail' className='w-16 rounded-sm' />
                                <span>
                                    <h3 className='text-base font-medium'>{product.title} <strong>x{product.quantity}</strong></h3>
                                    <p className='text-gray-400 text-sm'>{product.price.toLocaleString('en-US', { style: 'currency', currency: 'VND' })}</p>
                                </span>
                            </div>
                        ))
                    )}
                    <span className='text-lg font-medium'>Tổng tiền: {handleSumTotalPrice(order).toLocaleString('en-US', { style: 'currency', currency: 'VND' })}</span>
                </div>
            ))}
            {isFetching && ReactDOM.createPortal(<Loading />, document.getElementById("loading"))}
        </div>

    )
}

export default OrderHistory
