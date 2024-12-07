import React from 'react'
import { Button, Form } from 'react-bootstrap'
import logo from "../assets/logo.png"
import { publicAxios } from '../api/configapi'
import Snackbar from '@mui/material/Snackbar';
import { useSnackbar } from '../ultit/SnackbarProvider';
import Cookies from 'js-cookie';



export default function Login() {
  const [userLogin, setUserLogin] = React.useState({
    loginName: "",
    password: "",
  })
  const {showSnackbar} = useSnackbar()
  const handleLogin =async () => {
    if (userLogin.loginName === "" || userLogin.password === "") {
      alert("Vui lòng nhập đầy đủ thông tin")
      return
    }
    try {
      // Gửi yêu cầu đăng nhập
      const result = await publicAxios.post("/auth/api/user/login", userLogin);
     
    console.log(result)
      // Kiểm tra mã trạng thái (status)
      if (result.status === 200) {
        // Lưu token vào cookie
        Cookies.set("token", result.data.token, { expires: 1/24 });
    
        // Lưu thông tin người dùng vào cookie
        Cookies.set("loginData", JSON.stringify({
          loginName: result.data.data.loginName,
          fullName: result.data.data.fullName,
          role:result.data.data.name,
        }), { expires: 1/24 });
        
        // Hiển thị thông báo thành công
        showSnackbar(result.data.message, "success");
    
        // Chuyển hướng về trang chủ
        setTimeout(() => {
          window.location.href = "/";
        }, 2500);
      }
    } catch (error) {
      // Xử lý lỗi khi xảy ra
      const errorMessage = error?.response?.data?.message || error.message || "Đã có lỗi xảy ra";
      
      // Hiển thị thông báo lỗi
      showSnackbar(errorMessage, "error");
    }
    
}
  return (
    < div className=' w-screen h-screen bg-cover'>
      <div>
        <img src={logo} />
      </div>
    <div className='w-[600px] h-[310px] m-auto rounded-xl p-4
 shadow-[5px_-11px_29px_3px_rgba(101,_37,_37,_0.45)]'>
        <p className='text-center font-bold text-2xl text-red-600 ' >Phần mềm Quản Lý Khoản Vay</p>
        <Form>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label className='font-bold '>Tên đăng nhập:</Form.Label>
        <Form.Control type="email" className='bg-transparent ' placeholder="Nhập tên đăng nhập"  onChange={(e) => setUserLogin({ ...userLogin, loginName: e.target.value })}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label className='font-bold'>Mật khẩu:</Form.Label>
        <Form.Control type="password"  className='bg-transparent' placeholder="Nhập mật khẩu" onKeyDown={(e) => e.key === "Enter" && handleLogin()}  onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })}/>
      </Form.Group>
    </Form>
    <Button className='w-[80%] ml-[50px] mt-[5px]' variant='danger' onClick={handleLogin}>Đăng Nhập</Button>
    </div>
    
    </div>
    
  )
}
