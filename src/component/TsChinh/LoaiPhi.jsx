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

export default function LoaiPhi() {
  const [dataRender,setDataRender] =useState([]);
  const [checkBoxRow, setCheckBoxRow] = useState([]);
  const [flag, setFlag] = useState(false);
  const {showSnackbar} = useSnackbar();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () =>{
    setFeeType({
      id:0,
      description: "",
      inputedUser: JSON.parse(Cookies.get("loginData")).loginName,
      inputedDate:null,
    })
    setOpen(false);}

  const [feeType, setFeeType] = useState({
    id:0,
    description: "",
    inputedUser: JSON.parse(Cookies.get("loginData")).loginName,
    inputedDate:null,
  }); 
  const columns = [
    { field: "id", headerName: "STT", width: 70 ,valueGetter: (params) => dataRender?.findIndex((e)=>e.id == params)+1},
    { field: "description", headerName: "Loại Phí", width: 300 },

  ]
  const paginationModel = { page: 0, pageSize: 10 };

  useEffect(() => {
    getListLoanPurpose ();
  },[flag]);

  const getListLoanPurpose = async () => {
    try {
      const result= await privateAxios.get("api/feeType/list");
      setDataRender(result.data.data);
    } catch (error) {
      showSnackbar(error.response.data.message, "error");
    }
  }

  const creatrNew = async () => {
    if(!window.confirm("Tạo mới loại phí?")){return;}
    if(feeType.description === ""){alert("Vui lớng nhập đầy đủ thống tin");return;}
    try {
      const result = await privateAxios.post("api/feeType/create", feeType);
      showSnackbar(result.data.message, "success");
      handleClose();
      setFlag(!flag);
    } catch (error) {
      showSnackbar(error.response.data.message, "error");
    }
  }

  const openEdit = () =>{
    const data = dataRender.find(e => e.id == checkBoxRow[0]);
    setFeeType(data);
    handleOpen();
  }
  const handleEdit = async () => {
    if(!window.confirm("Chỉnh sửa loại phí?")){return;}
    if(feeType.description === ""){alert("Vui lớng nhập đầy đủ thống tin");return;}
     try {
          const result = await privateAxios.post("api/feeType/edit", feeType);
          showSnackbar(result.data.message, "success");
          handleClose();
          setFlag(!flag);
        } catch (error) {
          showSnackbar(error.response.data.message, "error");
        }
      
  }

  const handleDelete = async () => {
    if(!window.confirm("Xóa loại phí?")){return;}
    try {
      const result = await privateAxios.post("api/feeType/delete", checkBoxRow);
      showSnackbar(result.data.message, "success");
      setFlag(!flag);
    } catch (error) {
      showSnackbar(error.response.data.message, "error");
    }
  }
  return (
    <div>
       <div className="flex items-center w-full h-[40px] ">
        <p className="font-[300] text-4xl   text-gray-700  w-full ">
          {" "}
       Loại Phí
        </p>
      </div>
      <div className="flex gap-2 items-center">
      <Button   style={{ display: checkBoxRow.length == 1 ? "none" : "block" }}  onClick={handleOpen} variant="success"><i className="fa-solid fa-folder-plus"></i> Tạo Mới</Button>
      <Button style={{ display: checkBoxRow.length == 1 ? "block" : "none" }} variant="warning" onClick={openEdit} >   <i class="fa-solid fa-pen-to-square"></i> Chỉnh sửa</Button>
      <Button style={{ display: checkBoxRow.length > 0 ? "block" : "none" }} variant="danger" onClick={handleDelete}><i className="fa-solid fa-trash"></i> Xóa bỏ</Button>
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
           {checkBoxRow.length ==1 ? "Chỉnh sửa loại phí" : "Tạo mới loại phí"}
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
                Loại Phí <span style={{ color: "red" }}>*</span>
                </span>
              }
              multiline
              maxRows={4}
              style={{ margin: "10px", width: "100%" }}
            />
           { checkBoxRow.length ==1 ?
            <Button style={{ width: "20%" ,marginLeft:"280px",marginTop:"20px" }} variant="warning" onClick={handleEdit}>{" "} <i class="fa-solid fa-floppy-disk"></i> Sửa</Button>
            :
            <Button  style={{ width: "20%" ,marginLeft:"280px",marginTop:"20px" }} variant="success" onClick={creatrNew}>{" "} <i class="fa-solid fa-floppy-disk"></i> Lưu</Button>
           }
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}
