import React from 'react'
import { Button } from 'react-bootstrap'
import * as XLSX from "xlsx";
export default function ExportExcel({columnsForExcel,datatExcel,excelName,headersExport}) {
    const handleExportExcel = () => {
        // Tạo dữ liệu từ mảng ban đầu với các cột cần thiết
        const formattedData = datatExcel?.map((item) => {
            const row = {};
            columnsForExcel?.forEach((field, index) => {
                row[headersExport[index]] = item[field];
            });
            return row;
          });
       // Tạo worksheet từ dữ liệu
    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // Tạo workbook và thêm worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách " + excelName);

    // Ghi file Excel
    XLSX.writeFile(workbook, `${excelName}.xlsx`);
        
    }
  return (
    <div>
         <Button variant="warning" onClick={handleExportExcel}>
          {" "}
          <i className="fa-solid fa-file-excel"></i> Export Danh sách {excelName}{" "}
        </Button>
    </div>
  )
}
