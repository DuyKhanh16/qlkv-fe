import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

export default function Nav() {
    const [hiddenTSC,setHiddenTSC] = useState(true)
    const [hiddenGD,setHiddenGD] = useState(true)
    const navigate = useNavigate();
  return (
    <div className='w-[200px] h-[850px]   p-2 shadow-xl text-[15px]'   >
        <p className='font-bold hover:text-black cursor-pointer ' onClick={()=>setHiddenTSC(!hiddenTSC)}> <span>{hiddenTSC? "-" : "+"}</span> Tham số chính</p>
        <div>
        <ul className='text-sm text-[15px] font-[600] text-gray-600 ' style={{display:hiddenTSC ? "block" : "none"}} >
        
            <li className=' hover:text-[15px] cursor-pointer h-[40px] w-[180px] rounded-md p-2 ml-[-30px] hover:bg-gray-100' onClick={()=>navigate("/KhachHang")}> Khách hàng</li>
            <li className=' hover:text-[15px] cursor-pointer h-[40px] w-[180px] rounded-md p-2 ml-[-30px] hover:bg-gray-100' onClick={()=>navigate("/Duan")}> Dự án</li>
            <li className=' hover:text-[15px] cursor-pointer h-[40px] w-[180px] rounded-md p-2 ml-[-30px] hover:bg-gray-100' onClick={()=>navigate("/LoaiDuAn")}> Loại dự án</li>
            <li className=' hover:text-[15px] cursor-pointer h-[40px] w-[180px] rounded-md p-2 ml-[-30px] hover:bg-gray-100'onClick={()=>navigate("/MucDichVay")}> Mục đích vay</li>
            <li className=' hover:text-[15px] cursor-pointer h-[40px] w-[180px] rounded-md p-2 ml-[-30px] hover:bg-gray-100'onClick={()=>navigate("/LoaiTSDB")}> Loại tài sản đảm bảo</li>
            <li className=' hover:text-[15px] cursor-pointer h-[40px] w-[180px] rounded-md p-2 ml-[-30px] hover:bg-gray-100'onClick={()=>navigate("/LoaiPhi")} > Loại phí</li>
            <li className=' hover:text-[15px] cursor-pointer h-[40px] w-[180px] rounded-md p-2 ml-[-30px] hover:bg-gray-100'onClick={()=>navigate("/LoaiDieuChinh")} > Loại điều chỉnh</li>
        </ul>
        </div>
        <p className='font-bold hover:text-black cursor-pointer ' onClick={()=>setHiddenGD(!hiddenGD)}> <span>{hiddenGD? "-" : "+"}</span> Giao dịch</p>
        <div>
        <ul  className='text-sm  text-[15px] font-[600] text-gray-600' style={{display:hiddenGD ? "block" : "none"}}>
            <li className=' hover:text-[15px] cursor-pointer h-[40px] w-[180px] rounded-md p-2 ml-[-30px] hover:bg-gray-100' onClick={()=>navigate("/KhoanVay")} > Khoản vay</li>
            <li className=' hover:text-[15px] cursor-pointer h-[40px] w-[180px] rounded-md p-2 ml-[-30px] hover:bg-gray-100' onClick={()=>navigate("/KheUoc")}> Khế ước</li>
            <li className=' hover:text-[15px] cursor-pointer h-[40px] w-[180px] rounded-md p-2 ml-[-30px] hover:bg-gray-100' onClick={()=>navigate("/LichThanhToan")}> Lịch thanh toán</li>
            <li className=' hover:text-[15px] cursor-pointer h-[40px] w-[180px] rounded-md p-2 ml-[-30px] hover:bg-gray-100' onClick={()=>navigate("/DieuChinhLSKheUoc")}> Điều chỉnh lãi xuất khế ước</li>
            <li className=' hover:text-[15px] cursor-pointer h-[40px] w-[180px] rounded-md p-2 ml-[-30px] hover:bg-gray-100' onClick={()=>navigate("/TSDB")}> Tài sản có thể đảm bảo</li>
            <li className=' hover:text-[15px] cursor-pointer h-[40px] w-[180px] rounded-md p-2 ml-[-30px] hover:bg-gray-100' onClick={()=>navigate("/HDTheChap")}> Hợp đồng thế chấp</li>
            <li className=' hover:text-[15px] cursor-pointer h-[40px] w-[180px] rounded-md p-2 ml-[-30px] hover:bg-gray-100' onClick={()=>navigate("/TraNo")}> Trả nợ</li>
            <li className=' hover:text-[15px] cursor-pointer h-[40px] w-[180px] rounded-md p-2 ml-[-30px] hover:bg-gray-100' onClick={()=>navigate("/TraPhi")}> Trả phí</li>
            <li className=' hover:text-[15px] cursor-pointer h-[40px] w-[180px] rounded-md p-2 ml-[-30px] hover:bg-gray-100'onClick={()=>navigate("/GDDieuChinh")}> Giao dịch điều chỉnh</li>
        </ul>
        </div>
       
    </div>
  )
}
