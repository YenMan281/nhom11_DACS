import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as ReactDOM from 'react-dom';

import icons from '../../utils/icons';
import * as apis from "../../apis"
import Loading from '../../UI/Loading';

const { RiUserLine, AiFillEye, AiFillEyeInvisible } = icons;


const isEmpty = (str) => str.trim() === '';
const isEightChars = (str) => str.length >= 8;

const Signup = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const nameInputRef = useRef()
    const usernameInputRef = useRef()
    const passwordInputRef = useRef()
    const emailInputRef = useRef()

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isFetching } = useSelector(state => state.auth.signup)
    const [formInputsValidity, setFormInputValidity] = useState({
        name: true,
        username: true,
        password: true,
        email: true,
    });
    const handleSignup = (e) => {
        e.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredUsername = usernameInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;

        const enteredNameValid = !isEmpty(enteredName);
        const enteredUsernameValid = !isEmpty(enteredUsername);
        const enteredPasswordValid = isEightChars(enteredPassword);
        const enteredEmailValid = !isEmpty(enteredEmail);

        setFormInputValidity({
            name: enteredNameValid,
            username: enteredUsernameValid,
            password: enteredPasswordValid,
            email: enteredEmailValid,
        });
        if (enteredNameValid && enteredUsernameValid && enteredPasswordValid && enteredEmailValid) {
            const newUser = {
                name: enteredName,
                username: enteredUsername,
                password: enteredPassword,
                email: enteredEmail,
            };
            apis.signupUser(newUser, dispatch, navigate);
        }
    };


    return (
        <div className='w-full h-screen flex justify-center items-center bg-[#f7f7f7]'>
            <div className='768:w-1/3 w-[95%] h-3/4 shadow-xl bg-white rounded-md flex flex-col justify-around'>
                <div className='flex flex-col w-full items-center gap-2'>
                    <RiUserLine className="text-blue-500 768:text-[50px] text-[30px]" />
                    <strong className='768:text-5xl text-2xl'>Tạo Tài Khoản!</strong>
                </div>
                <form method='POST' action='' className='flex-col flex w-full items-center gap-8' onSubmit={handleSignup}>
                    <span className='768:w-3/5 w-4/5'>
                        <label form='name'>Tên</label>
                        <span className={`flex border-b-2 pb-1 ${formInputsValidity.name ? " " : "border-red-500 border-b-2"} `}>
                            <input type="text" name='name' className='outline-none w-full focus:ring-0 focus:border-blue-500' ref={nameInputRef} />
                            <RiUserLine className='w-8' />
                        </span>
                        <span>{!formInputsValidity.name && <small className='text-red-500'>Không được để trống!</small>}</span>
                    </span>
                    <span className={`768:w-3/5 w-4/5 `}>
                        <label form='username'>Tên Người Dùng</label>
                        <span className={`flex border-b-2 pb-1 ${formInputsValidity.username ? " " : "border-red-500 border-b-2"} `}>
                            <input type="text" name='username' className={`outline-none w-full focus:ring-0 focus:border-blue-500 `} ref={usernameInputRef} />
                            <RiUserLine className='w-8' />
                        </span>
                        <span>{!formInputsValidity.username && <small className='text-red-500'>Không được để trống!</small>}</span>
                    </span>
                    <span className='768:w-3/5 w-4/5'>
                        <label form='email'>Email</label>
                        <span className={`flex border-b-2 pb-1 ${formInputsValidity.email ? " " : "border-red-500 border-b-2"} `}>
                            <input type="email" name='email' className='outline-none w-full focus:ring-0 focus:border-blue-500' ref={emailInputRef} />
                            <RiUserLine className='w-8' />
                        </span>
                        <span>{!formInputsValidity.email && <small className='text-red-500'>Không được để trống!</small>}</span>
                    </span>
                    <span className='768:w-3/5 w-4/5'>
                        <span className='768:w-3/5 w-4/5'>
                            <label form='password'>Mật Khẩu</label>
                            <span className={`flex border-b-2 pb-1 ${formInputsValidity.password ? " " : "border-red-500 border-b-2"} `}>
                                <input
                                    type={`${!isShowPassword ? "password" : "text"}`}
                                    name='password'
                                    className='outline-none w-full focus:ring-0 focus:border-blue-500'
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    title="Password must contain at least 8 characters, including at least one number, one lowercase and one uppercase letter"
                                    ref={passwordInputRef}
                                />
                                <span onClick={() => { setIsShowPassword(!isShowPassword) }}>
                                    {!isShowPassword && <AiFillEye className='w-8' />}
                                    {isShowPassword && <AiFillEyeInvisible className='w-8' />}
                                </span>
                            </span>
                            <span>{!formInputsValidity.password && <small className='text-red-500'>ít nhất có 1 chư hoa, 1 chữ thường, 1 số, và ít nhất là 8 kí tự</small>}</span>
                        </span>
                    </span>
                    <div className='flex justify-between 768:w-3/5 w-4/5'>
                        <Link to="/login">Bạn Đã Có Tài Khoản Chưa?</Link>
                        <Link>Quên Mật Khẩu?</Link>
                    </div>
                    <button type='submit' className='bg-blue-500 ml-10 px-6 py-3 text-white rounded-md hover:opacity-80'>Sign Up &#8594;</button>
                </form>
            </div>
            {isFetching && ReactDOM.createPortal(<Loading />, document.getElementById("loading"))}

        </div >
    )
}
export default Signup