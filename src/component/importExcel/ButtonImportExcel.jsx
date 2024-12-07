import React, { useRef } from 'react'
import { Button } from 'react-bootstrap'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ImportExcel from './ImportExcel';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Checkbox, CircularProgress } from '@mui/material';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
export default function ButtonImportExcel({columnsForExcel,saveExcel}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
   const [dataExcel, setDataExcel] = React.useState([]);
   const [tableName, setTableName] = React.useState();

   const paginationModel = { page: 0, pageSize: 5 };
  const columns=[];
 
    const getDataExcel = (data) => {
      setTableName(data[0]);
      setDataExcel(data.splice(1));
    }
    for(const key in tableName){
      columns.push({ field: key, headerName: tableName[key], width: 120 });
    }
    
  return (
    <div>
         <Button variant="success" onClick={handleOpen}>
          {" "}
          <i className="fa-solid fa-file-excel"></i> Import Excel{" "}
        </Button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center text-green-600 '>
            Import Excel khách hàng
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div style={{display:"  flex " }}>
            {/* component import file excel */}
           <ImportExcel columnsForExcel={columnsForExcel} getDataExcel={getDataExcel}/>
           
            <Button variant="warning ml-4"style={{display:dataExcel.length==0?"none":"block"}} onClick={()=>saveExcel(dataExcel)}><i class="fa-solid fa-floppy-disk"></i> Lưu Excel</Button>
           </div>
           <p className='font-bold text-lg m-3 text-green-700'> <i class="fa-solid fa-list-check"></i> Dữ liệu Import</p>
           <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={dataExcel}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        getRowId={(row) => row.busRegist}
        checkboxSelection={columns.length==0?false:true}

        sx={{ border: 0 }}
      />
    </Paper>
          </Typography>
        </Box>
      </Modal>
      
    </div>
  )
}
