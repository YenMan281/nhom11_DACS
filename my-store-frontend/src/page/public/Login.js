import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as ReactDOM from 'react-dom';

import icons from '../../utils/icons';
import * as apis from "../../apis"
import Loading from '../../UI/Loading';


const { AiOutlineLogin, RiUserLine, AiFillEye, AiFillEyeInvisible } = icons;
const Login = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isFetching } = useSelector(state => state.auth.login)


    const handleLogin = (e) => {
        e.preventDefault();
        const newUser = {
            email,
            password
        }
        apis.loginUser(newUser, dispatch, navigate)
    }
    return (
        <div className='w-full h-screen flex justify-center items-center bg-[#f7f7f7]'>
            <div className='768:w-1/3 w-[95%] h-3/4 shadow-xl bg-white rounded-md flex flex-col justify-around'>
                <div className='flex flex-col w-full items-center gap-2'>
                    <AiOutlineLogin className="text-blue-500 768:text-[50px] text-[40px]" s />
                    <strong className='t768:text-5xl text-3xl'>XIN CHÀO!</strong>
                    <small className='768:text-3xl text-[#ccc]'>Đăng nhập vào tài khoản</small>
                </div>
                <form method='POST' action='' className='flex-col flex w-full items-center gap-8' onSubmit={handleLogin}>
                    <span className='768:w-3/5 w-4/5 '>
                        <label form='email'>Email</label>
                        <span className='flex border-b-2 pb-1 '>
                            <input
                                type="email"
                                name='email'
                                className='outline-none w-full'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <RiUserLine className='w-8' />
                        </span>
                    </span>
                    <span className='768:w-3/5 w-4/5'>
                        <label form='password'>Mật Khẩu</label>
                        <span
                            className='flex border-b-2 pb-1 cursor-pointer '

                        >
                            <input
                                type={`${!isShowPassword ? "password" : "text"}`}
                                name='password'
                                className='outline-none w-full'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span onClick={() => { setIsShowPassword(!isShowPassword) }}>
                                {!isShowPassword && <AiFillEye className='w-8' />}
                                {isShowPassword && <AiFillEyeInvisible className='w-8' />}
                            </span>
                        </span>
                    </span>
                    <div className='flex justify-between 768:w-3/5 w-4/5'>
                        <Link to="/signup">Tạo Tài Khoản!</Link>
                        <Link>Quên Mật Khẩu?</Link>
                    </div>
                    <button type='submit' className='bg-blue-500 ml-10 px-6 py-3 text-white rounded-md hover:opacity-80'>Login &#8594;</button>
                </form>
            </div>
            {isFetching && ReactDOM.createPortal(<Loading />, document.getElementById("loading"))}
        </div>
    )
}

export default Login;