import React, { useEffect, useState } from 'react'
import { getAllOrder } from '../../apis/order'
import { createAxios } from '../../utils/createIntance';
import { useDispatch, useSelector } from 'react-redux';
import authslice from '../../store/authSlice';
import moment from 'moment';

const AllOrder = () => {
    const { currentUser } = useSelector(state => state.auth.login)
    const dispatch = useDispatch()
    const [orders, setOrders] = useState([])
    const [selectedOrderIds, setSelectedOrderIds] = useState([]);
    let requestJWT = createAxios(currentUser, dispatch, authslice.actions.loginSuccess);

    useEffect(() => {
        let result = {}
        getAllOrder(dispatch, currentUser?.token, requestJWT)
            .then((response) => {
                response.data?.data?.forEach(item => {
                    if (!result[item.userId]) {
                        result[item.userId] = [item];
                    } else {
                        result[item.userId].push(item);
                    }
                });

                const output = Object.values(result);
                setOrders(output)
            })
            .catch((err) => { console.log(err) })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser])

    const handleToggleDetailOrder = (orderId) => {
        console.log(orderId);
        if (selectedOrderIds.includes(orderId)) {
            setSelectedOrderIds(prevState => prevState.filter(id => id !== orderId));
        } else {
            setSelectedOrderIds(prevState => [...prevState, orderId]);
        }
    }
    console.log(orders);
    return (
        <div className='min-h-screen my-20 w-full flex flex-col items-center'>
            <p className='font-bold text-2xl capitalize'>Đơn hàng</p>
            {orders?.map((order, index) => (
                <div className='w-full 768:w-3/5 border-collapse border rounded-md shadow-md flex flex-col gap-3 p-4 cursor-pointer' key={index} onClick={() => handleToggleDetailOrder(order[0].id)}>
                    <div>Người dùng: {order[0].userId}</div>
                    <span>Tổng đơn: {order.length}</span>
                    {selectedOrderIds.includes(order[0].id) && (
                        order.map((item) => (
                            <div key={item.id} className='px-4 flex gap-4 duration-1000 animate-slide-left2 justify-around'>
                                <h1>Id: {item.id}</h1>
                                <span>{item.total.toLocaleString('en-US', { style: 'currency', currency: 'VND' })}</span>
                                <span>Ngày đặt: {moment(item.updatedAt).format("DD-MM-YYYY")}</span>
                            </div>
                        ))
                    )}
                </div>
            ))}
        </div>
    )
}

export default AllOrder

