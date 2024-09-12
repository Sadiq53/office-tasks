import React, { useEffect, useRef, useState } from 'react'
import Header from '../../shared/Header/Header'
import { useDispatch, useSelector } from 'react-redux';
import {useFormik} from 'formik'
import DeleteFileSchema from '../../../../schema/DeleteFileSchema';
import { handleBulkFileDelete, handleDeleteFile, resetState } from '../../../../redux/AdminDataSlice';

const DeleteData = () => {

  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("");
  const RawFileData = useSelector(state => state.AdminDataSlice?.file);
  const isError = useSelector(state => state.AdminDataSlice?.isError);
  const isFullfilled = useSelector(state => state.AdminDataSlice?.isFullfilled);
  const [breakDownFIleName, setBreakDownFIleName] = useState([]);
  const resetForm = useRef();

  const deleteFileForm = useFormik({
    validationSchema : DeleteFileSchema,
    initialValues : {
      file : ''
    },
    onSubmit : (formData) => {
      const {file} = formData
      const getFileData = RawFileData?.filter(value => value.name === file)
      dispatch(handleDeleteFile(getFileData[0]?._id))
    }
  })

  const deleteAllFiles = () =>{
    const getFileData = RawFileData?.map(value => value?._id)
    getFileData?.length !== 0 ? dispatch(handleBulkFileDelete(getFileData)) : 
    setAlertMsg("Nothing to Delete")
    setShowAlert(true)
    setTimeout(()=>{
      setShowAlert(false)
      setAlertMsg("")
      }, 5000)
  }

  useEffect(()=>{
    setBreakDownFIleName(RawFileData?.map(({ name }) => name));
  }, [RawFileData, isFullfilled])

  useEffect(()=>{
    if(isError) {
      setAlertMsg("Error in Deleting File, Try again later")
      setTimeout(()=>{
        setAlertMsg("")
      }, 5000)
      dispatch(resetState())
    } 
  }, [isError])

  useEffect(()=>{
    if(isFullfilled) {
      setAlertMsg("Data Deleted Successfully")
      setShowAlert(true)
      setTimeout(()=>{
        setShowAlert(false);
        setAlertMsg("")
      },3000)
      resetForm.current.click();
      dispatch(resetState())
    }
  }, [isFullfilled])

  return (
    <>
        <Header />

        <div className="container my-5" >
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3>Delete Data By List</h3>
            </div>
            <form onSubmit={deleteFileForm.handleSubmit}>
            <button ref={resetForm} style={{visibility : "hidden"}} type='reset'></button>
            <div className="card-body">
                <div className="bank-sec mb-3">
                  <div>
                  <select 
                  name="file"
                  aria-controls="table-style-hover"
                  className={'form-select form-control form-select-md '+(deleteFileForm.errors.file ? 'is-invalid' : '')}
                  id="dt-length-3"
                  onChange={deleteFileForm.handleChange}
                  >
                    <option>Select List</option>
                    {
                      breakDownFIleName?.map(value=>(
                        <option key={value}>{value}</option>
                      ))
                    }
                  </select>
                  {
                    deleteFileForm.errors.file ? <small className='text-danger'>{deleteFileForm.errors.file}</small> : null
                  }
                  </div>
                  <button type='submit' className='btn btn-danger btn-md'>Delete</button>
                </div>
                {
                  showAlert ? <div className="alert alert-success text-success">{alertMsg}</div> : null
                }
            </div>
            <div className="card-footer text-right">
              <button type='button' onClick={deleteAllFiles} className='btn btn-danger '> <i class="fa-solid fa-trash-can"></i> Bulk Delete</button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default DeleteData