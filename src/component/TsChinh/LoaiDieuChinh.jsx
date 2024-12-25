import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { privateAxios } from '../../api/configapi';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Cookies from 'js-cookie';
import { useSnackbar } from '../../ultit/SnackbarProvider';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function LoaiDieuChinh() {
  const [dataRender,setDataRender] =useState([]);
  const [checkBoxRow, setCheckBoxRow] = useState([]);
  const [flag, setFlag] = useState(false);
  const {showSnackbar} = useSnackbar();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [feeType, setFeeType] = useState({
    id: "",
    description: "",
    inputedUser: JSON.parse(Cookies.get("loginData")).loginName,
  }); 
  const columns = [
    { field: "id", headerName: "Mã điều chỉnh", width: 300 },
    { field: "description", headerName: "Loại điều chỉnh", width: 300 },
  ]
  const paginationModel = { page: 0, pageSize: 10 };

  useEffect(() => {
    getListLoanPurpose ();
  },[flag]);

  const getListLoanPurpose = async () => {
    try {
      const result= await privateAxios.get("api/ddajust-type/list");
      setDataRender(result.data.data);
    } catch (error) {
      showSnackbar(error.response.data.message, "error");
    }
  }
  console.log(dataRender)
  return (
    <div>
       <div className="flex items-center w-full h-[40px] ">
        <p className="font-[300] text-4xl   text-gray-700  w-full ">
          {" "}
       Loại điều chỉnh
        </p>
      </div>
      <div className="flex gap-2 items-center">
      <Button   style={{ display: checkBoxRow.length == 1 ? "none" : "block" }}  onClick={handleOpen} variant="success"><i className="fa-solid fa-folder-plus"></i> Tạo Mới</Button>
      <Button style={{ display: checkBoxRow.length == 1 ? "block" : "none" }} variant="warning"  >   <i class="fa-solid fa-pen-to-square"></i> Chỉnh sửa</Button>
      <Button style={{ display: checkBoxRow.length > 0 ? "block" : "none" }} variant="danger"><i className="fa-solid fa-trash"></i> Xóa bỏ</Button>
      </div>

      <div>
      <Paper sx={{ height: "700px", width: "100%" }}>
        <DataGrid
          rows={dataRender}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          selectionModel={checkBoxRow}
          onRowSelectionModelChange={(row) => setCheckBoxRow(row)} // Truyền mảng các id của các hàng đã chọn
          sx={{ border: 0 }}
        />
      </Paper>
      </div>
     <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           {checkBoxRow.length ==1 ? "Chỉnh sửa loại điều chỉnh" : "Tạo mới loại điều chỉnh"}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          
             <TextField
              value={feeType.description}
              onChange={(e) =>
                setFeeType((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              label={
                <span>
                Loại điều chỉnh <span style={{ color: "red" }}>*</span>
                </span>
              }
              multiline
              maxRows={4}
              style={{ margin: "10px", width: "100%" }}
            />
              <TextField
              value={feeType.description}
              onChange={(e) =>
                setFeeType((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              label={
                <span>
                Mã loại điều chỉnh <span style={{ color: "red" }}>*</span>
                </span>
              }
              multiline
              maxRows={4}
              style={{ margin: "10px", width: "100%" }}
            />
               <p className='ml-3 italic text-red-500'> * Mã loại viết in hoa liền không cách</p>
           { checkBoxRow.length ==1 ?
            <Button style={{ width: "20%" ,marginLeft:"280px",marginTop:"20px" }} variant="warning">{" "} <i class="fa-solid fa-floppy-disk"></i> Sửa</Button>
            :
            <Button  style={{ width: "20%" ,marginLeft:"280px",marginTop:"20px" }} variant="success">{" "} <i class="fa-solid fa-floppy-disk"></i> Lưu</Button>
           }
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}
