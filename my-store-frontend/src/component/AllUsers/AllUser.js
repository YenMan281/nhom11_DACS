import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment"
import { createAxios } from "../../utils/createIntance"
import icons from '../../utils/icons';
import { deleteUser, getAllUsers } from '../../apis';
import { useNavigate } from 'react-router';
import authslice from '../../store/authSlice';
import Swal from 'sweetalert2';


const { AiOutlineUserDelete } = icons;
const AllUser = () => {
  const users = useSelector(state => state.users.users.allUsers?.data);
  const user = useSelector(state => state.auth.login?.currentUser);
  const deleteSucess = useSelector(state => state.users.delete?.success);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let requestJWT = createAxios(user, dispatch, authslice.actions.loginSuccess);

  const handlerDeleteUser = (id) => {
    Swal.fire({
      title: 'Bạn chắc chắn muốn xóa người dùng này?',
      text: "Bạn sẽ không thể hoàn điều này!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Vâng, xóa nó!'
    }).then((result) => {
      if (result.isConfirmed) {
        // deleteUser(user?.token, dispatch, id, requestJWT)
        Swal.fire(
          'Chưa cho xóa!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  useEffect(() => {
    !user && navigate("/login")
    getAllUsers(user.token, dispatch, requestJWT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, navigate, user, deleteSucess])
  return (
    <div className='w-full min-h-screen mt-20 flex flex-col items-center'>
      <h2 className='text-3xl font-bold mb-4 text-center'>Quản lý thành viên</h2>
      <div className='overflow-x-auto w-full'>
        <table className='table-auto border-collapse w-full'>
          <thead className='border-b-2'>
            <tr className='h-12 text-lg font-bold text-gray-700'>
              <th className='px-4 py-2 text-center'>ID</th>
              <th className='px-4 py-2'>TÊN</th>
              <th className='px-4 py-2'>TÊN NGƯỜI DÙNG </th>
              <th className='px-4 py-2'>Email</th>
              <th className='px-4 py-2 text-center'>Admin</th>
              <th className='px-4 py-2 text-center'>Ngày tạo</th>
              <th className='px-4 py-2 text-center'>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr
                className={`h-12 ${index % 2 !== 0 ? "bg-gray-100" : ""}`}
                key={user.id}
              >
                <td className='px-4 py-2 text-center'>{user.id.toString()}</td>
                <td className='px-4 py-2'>{user.name}</td>
                <td className='px-4 py-2'>{user.username}</td>
                <td className='px-4 py-2'>{user.email}</td>
                <td className='px-4 py-2 text-center'>{user.admin ? "Quản lý" : "Thành viên"}</td>
                <td className='px-4 py-2 text-center'>{moment(user.updatedAt).utc().format("DD-MM-YYYY")}</td>
                <td className='px-4 py-2 text-center'>
                  <button
                    onClick={() => handlerDeleteUser(user?.id)}
                    className='bg-red-500 hover:bg-red-600 text-white rounded-lg px-3 py-1 focus:outline-none'
                  >
                    <AiOutlineUserDelete title="Delete user" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  )
}

export default AllUser;