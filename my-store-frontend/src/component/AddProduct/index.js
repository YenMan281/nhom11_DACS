import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import * as ReactDOM from 'react-dom';
import "react-toastify/dist/ReactToastify.css";

import { addProduct } from '../../apis/products';
import Loading from '../../UI/Loading';


const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isFetching } = useSelector(state => state.products.addProduct)
    const { currentUser } = useSelector(state => state.auth.login)
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [total, setTotal] = useState("");
    const [category, setCategory] = useState("sofa");


    const handleAddProduct = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('total', total);
        formData.append('category', category);
        formData.append('id', currentUser.user.id)
        const files = document.querySelector('#file').files;
        for (let i = 0; i < files.length; i++) {
            formData.append('image', files[i]);
        }
        addProduct(dispatch, formData, navigate);
    };
    return (
        <>
            <div className='w-full h-screen my-20 flex flex-col items-center'>
                <header>
                    <h2 className='text-2xl font-bold'>THÊM SẢN PHẨM</h2>
                </header>
                <form encType="multipart/form-data" method='POST' className='w-3/5 flex flex-col gap-4' onSubmit={handleAddProduct}>
                    <div className='flex flex-col gap-3'>
                        <label className='text-lg'>Tên Sản phẩm </label>
                        <input className='border p-1' type="text" name='title'
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label className='text-lg'>Giá</label>
                        <input className='border p-1' type="number" name='price' step="0.01"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label className='text-lg'>Hình Ảnh</label>
                        <input className='border p-1' type="file" id="file" name='image' multiple
                        />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label>Mô tả</label>
                        <textarea className='border p-1' type="text" name='description'
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label className='text-lg'>Số Lượng</label>
                        <input className='border p-1' type="number" name='total'
                            onChange={(e) => setTotal(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label>Phân Loại</label>
                        <select name='category' className='border p-1'
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="sofa" key="sofa">SOFA</option>
                            <option value="bantrangdiem" key="bantrangdiem">BÀN TRANG ĐIỂM</option>
                            <option value="tudo" key="tudo">TỦ ĐỒ</option>
                            <option value="banan" key="banan">BÀN ĂN</option>
                            <option value="banlamviec" key="banlamviec">BÀN LÀM VIỆC</option>
                            <option value="giuongngu" key="giuongngu">GIƯỜNG NGỦ</option>
                            
                        </select>
                    </div>
                    <button type='submit' className='border p-3 bg-blue-500 text-white rounded-md'>THÊM SẢN PHẨM</button>
                </form>

            </div>
            {isFetching && ReactDOM.createPortal(<Loading />, document.getElementById("loading"))}
        </>
    )
}

export default AddProduct