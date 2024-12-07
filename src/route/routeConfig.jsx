import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import  {PrivateRoute, AdminRoute } from './PrivateRoute'; // Import PrivateRoute
import { CircularProgress } from "@mui/material";

const Home = lazy(() => import('../component/pageMain/Home.jsx'));
const Login = lazy(() => import('../component/Login.jsx'));
const Admin = lazy(() => import('../component/pageAdmin/Admin.jsx'));
const KhachHang = lazy(() => import('../component/TsChinh/KhachHang.jsx'));
const Duan = lazy(() => import('../component/TsChinh/Duan.jsx'));
const LoaiPhi = lazy(() => import('../component/TsChinh/LoaiPhi.jsx'));
const LoaiTSDB = lazy(() => import('../component/TsChinh/LoaiTSDB.jsx'));
const LoaiDuAn = lazy(() => import('../component/TsChinh/LoaiDuAn.jsx'));
const LoaiDieuChinh = lazy(() => import('../component/TsChinh/LoaiDieuChinh.jsx'));
const MucDichVay = lazy(() => import('../component/TsChinh/MucDichVay.jsx'));
const KhoanVay = lazy(() => import('../component/Gdich/KhoanVay.jsx'));
const KheUoc = lazy(() => import('../component/Gdich/KheUoc.jsx'));
const Traphi = lazy(() => import('../component/Gdich/Traphi.jsx'));
const Trano = lazy(() => import('../component/Gdich/Trano.jsx'));
const TSDB = lazy(() => import('../component/Gdich/TSDB.jsx'));
const GDDieuChinh = lazy(() => import('../component/Gdich/GDDieuChinh.jsx'));
const HDTheChap = lazy(() => import('../component/Gdich/HDTheChap.jsx'));
const LichThanhToan = lazy(() => import('../component/Gdich/LichThanhToan.jsx'));
const DieuChinhLSKheUoc = lazy(() => import('../component/Gdich/DieuChinhLSKheUoc.jsx'));

const routeConfig = createBrowserRouter([
    {
        path: '/',
        element: (
            <Suspense fallback={<div>  <CircularProgress /></div>}>
                <PrivateRoute element={<Home />} /> {/* Bảo vệ route Home */}
            </Suspense>
        ),
        children: [
            {path : '/KhachHang', element: <KhachHang/>},
            {path : '/Duan', element: <Duan/>},
            {path : '/LoaiPhi', element: <LoaiPhi/>},
            {path : '/LoaiTSDB', element: <LoaiTSDB/>},
            {path : '/LoaiDuAn', element: <LoaiDuAn/>},
            {path : '/LoaiDieuChinh', element: <LoaiDieuChinh/>},
            {path : '/MucDichVay', element: <MucDichVay/>},
            {path : '/KhoanVay', element: <KhoanVay/>},
            {path : '/KheUoc', element: <KheUoc/>},
            {path : '/Traphi', element: <Traphi/>}, 
            {path : '/Trano', element: <Trano/>},
            {path : '/TSDB', element: <TSDB/>},
            {path : '/GDDieuChinh', element: <GDDieuChinh/>},
            {path : '/HDTheChap', element: <HDTheChap/>},       
            {path : '/LichThanhToan', element: <LichThanhToan/>},
            {path : '/DieuChinhLSKheUoc', element: <DieuChinhLSKheUoc/>},
        ]
        
    },
    {
        path: '/login',
        element: (
            <Suspense fallback={<div>Loading login...</div>}>
                <Login />
            </Suspense>
        ),
    },
  
    {
        path:"/admin",
        element: (
            <Suspense fallback={<div>Loading admin...</div>}>
                <AdminRoute element={<Admin />} />
            </Suspense>
        ),
    }
]);

export default routeConfig;
