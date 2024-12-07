import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import {  Outlet, useNavigate } from 'react-router-dom';
import { height } from '@mui/system';

export default function Body(props) {
    const navigate = useNavigate();
  const { window } = props;
  
const NAVIGATION = [
    {
      kind: 'header',
      title: 'Tham số chính',
    },
  
    {
      segment: 'KhachHang',
      title: 'Khách Hàng',
      icon: <DashboardIcon />,
      onClick: (navigate) => navigate('/KhachHang'),
    },
    {
      segment: 'Duan',
      title: 'Dự án',
      icon: <ShoppingCartIcon />,
      onClick: (navigate) => navigate('/Duan'),
    },
    {
      segment: 'LoaiDuAn',
      title: 'Loại dự án',
      icon: <BarChartIcon />,
      onClick: (navigate) => navigate('/LoaiDuAn'),
    },
    {
      segment: 'MucDichVay',
      title: 'Mục đích vay',
      icon: <DescriptionIcon />,
      onClick: (navigate) => navigate('/MucDichVay'),
    },
    {
      segment: 'LoaiTSDB',
      title: 'Loại tài sản đảm bảo',
      icon: <LayersIcon />,
      onClick: (navigate) => navigate('/LoaiTSDB'),
    },
    {
      segment: 'LoaiPhi',
      title: 'Loại phí',
      icon: <DashboardIcon />,
      onClick: (navigate) => navigate('/LoaiPhi'),
    },
    {
      kind: 'header',
      title: 'Giao dịch',
    },
    {
      segment: 'KhoanVay',
      title: 'Khoản vay',
      icon: <DashboardIcon />,
      onClick: (navigate) => navigate('/KhoanVay'),
    },
    {
      segment: 'KheUoc',
      title: 'Khế ước',
      icon: <ShoppingCartIcon />,
      onClick: (navigate) => navigate('/KheUoc'),
    },
    {
      segment: 'LichThanhToan',
      title: 'Lịch thanh toán',
      icon: <BarChartIcon />,
      onClick: (navigate) => navigate('/LichThanhToan'),
    },
    {
      segment: 'DieuChinhLSKheUoc',
      title: 'Điều chỉnh lãi suất khế ước',
      icon: <DescriptionIcon />,
      onClick: (navigate) => navigate('/DieuChinhLSKheUoc'),
    },
    {
      segment: 'TSDB',
      title: 'Tài sản có thể đảm bảo',
      icon: <LayersIcon />,
      onClick: (navigate) => navigate('/TSDB'),
    },
    {
      segment: 'HDTheChap',
      title: 'Hợp đồng thế chấp',
      icon: <ShoppingCartIcon />,
      onClick: (navigate) => navigate('/HDTheChap'),
    },
    {
      segment: 'TraNo',
      title: 'Trả nợ',
      icon: <BarChartIcon />,
      onClick: (navigate) => navigate('/TraNo'),
    },
    {
      segment: 'TraPhi',
      title: 'Trả phí',
      icon: <DescriptionIcon />,
      onClick: (navigate) => navigate('/TraPhi'),
    },
    {
      segment: 'GDDieuChinh',
      title: 'Giao dịch điều chỉnh',
      icon: <DashboardIcon />,
      onClick: (navigate) => navigate('/GDDieuChinh'),
    },
  ];
  
  const demoTheme = extendTheme({
   
    // colorSchemes: { light: true, dark: true },
    colorSchemeSelector: 'class',
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 600,
        lg: 1200,
        xl: 1536,
      },
    },
  });
  
  
  function useDemoRouter(initialPath) {
    const [pathname, setPathname] = React.useState(initialPath);
  
    const router = React.useMemo(() => {
      return {
        pathname,
        searchParams: new URLSearchParams(),
        navigate: (path) => setPathname(String(path)),
      };
    }, [pathname]);
  
    return router;
  }
  
  const Skeleton = styled('div')(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    height,
    content: '" "',
  }));
  

  const router = useDemoRouter("/KhachHang");

  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;

  return (
    <div >
    <AppProvider
      navigation={NAVIGATION.map((item) => ({
        ...item,
        onClick: item.onClick ? () => item.onClick(navigate) : undefined,
      }))}
      branding={{
        logo: null,
        title: "Danh Mục",
      }}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout   >
        <PageContainer >
          <Outlet ></Outlet>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
    </div>
  );
}
