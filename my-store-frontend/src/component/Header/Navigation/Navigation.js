import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom"
import productsSlice from '../../../store/productsSlice';
import { navbarItems } from '../../../utils/nav';

const Navigation = ({ offset }) => {
    const dispatch = useDispatch();
    const handlerSetProductType = (category) => {
        dispatch(productsSlice.actions.getProducts(category))
    }
    return (
        <>
            {navbarItems?.map(item => (
                <NavLink
                    key={item.text}
                    to={item.path}
                    className={({ isActive }) => isActive ? "text-blue-400" : `${offset ? "text-white" : "text-black"}`}
                    onClick={() => { handlerSetProductType(item.category) }}
                >
                    {item.text}
                </NavLink>

            ))}
        </>
    )
}

export default Navigation;