import React, { useRef, useState } from 'react'
import { Button } from 'react-bootstrap';
import * as XLSX from "xlsx";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function ImportExcel({columnsForExcel, getDataExcel}) {
    const fileInputRef = useRef(null);
   const [loading, setLoading] = useState(false);

    const handleButtonClick = () => {
        fileInputRef.current.click();
        setTimeout(() => {
          setLoading(true);
        }, 500);
      };
    
  const handleFileChange = (event) => {

    const file = event.target.files[0];
    if (file) {
      setLoading(false);
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
  
          // Lấy dữ liệu từ sheet đầu tiên
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const headers = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0];
          if (headers.length !== columnsForExcel.length) {
            alert("Số lượng các cột không đúng cấu trúc cơ sở dữ liệu");
            return;
          }
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: columnsForExcel , defval: ""}, { raw: true });
          
          getDataExcel(jsonData)
        };
        reader.readAsArrayBuffer(file);
    }
}
  return (
    <div>
            <Button variant="success" onClick={handleButtonClick }>
          {" "}
          <i className="fa-solid fa-file-excel"></i> Chọn file khách hàng{" "}
            </Button>
            <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            />
              {loading?<Box sx={{ display: 'flex' }} className="justify-center " style={{position:"absolute",top:"50%",left:"50%"}}>
            <CircularProgress />
              </Box>
              :<></>}
            </div>
  )
}
