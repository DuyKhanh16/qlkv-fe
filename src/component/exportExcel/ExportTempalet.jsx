import React from 'react'
import { Button } from 'react-bootstrap'

export default function ExportTempalet({nameFile}) {
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href =  `/template/Template_Import_${nameFile}.xlsx`; // Đường dẫn file
        // link.download = `Template_Import_${nameFile}.xlsx`; // Tên file khi tải xuống
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
  return (
    <div>
        <Button variant="success" onClick={handleDownload}><i class="fa-solid fa-file-excel"></i> Export Tempalet {nameFile} </Button>
    </div>
  )
}
