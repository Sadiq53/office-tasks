import React, { useRef } from 'react'
import Header from '../../shared/Header/Header'
import {useFormik} from 'formik'
import { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import AddDataSchema from '../../../../schema/AddDataSchema'
import { handleData } from '../../../../redux/AdminDataSlice';
import { API_URL } from '../../../../util/API_URL';


const AddData = () => {

  let [ checkFileFormat, setCheckFileFormat ] = useState(0)
  let [ isFileEmpty, setIsFileEmpty ] = useState(false)
  let [ fileData, setFileData ] = useState("")
  let chckFile = useRef();
  const dispatch = useDispatch()

  const banks = useSelector(state => state.AdminDataSlice?.bank)

  const handleFileUpload = (e) =>{
    let chckFormat = e.name?.split(".")
    if(chckFormat?.at(-1) != "xlsx" && chckFormat?.at(-1) != "csv") {
      setCheckFileFormat(1)
    } else {
      setIsFileEmpty(false)
      setCheckFileFormat(2)
      // console.log(e)
      setFileData(e)
    }
  }

  let addDataForm = useFormik({
    validationSchema : AddDataSchema,
    initialValues : {
      upload_file : null,
      bank : ''
    },
    onSubmit : async(formData) => {
        let vForm = new FormData();
        const file = fileData
          vForm.set("File", file);
          vForm.set("bank", formData?.bank); 
        // for (let [key, value] of vForm) {
        //   console.log(`${key}: ${value}`);
        // }
        // for (let [key, value] of vForm.entries()) {
        //   if (value instanceof File) {
        //       // If the entry is a file, log basic info
        //       console.log(`File Key: ${key}`);
        //       console.log(`File Name: ${value.name}`);
        //       console.log(`File Type: ${value.type}`);
        //       console.log(`File Size: ${value.size} bytes`);
        //   }}
        dispatch(handleData(vForm))
      }
    })

  return (
    <>
        <Header />

        <div className="container my-5" >
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3>Add Data</h3>
              <a href="./public/assets/samplefiles/sample_sheet.xlsx" download='Sample-File.xlsx'>Download Sample File</a>
            </div>
            <form onSubmit={addDataForm.handleSubmit}>
            <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Upload Excel Sheet</label>
                  <input
                    name="upload_file" 
                    type="file"
                    accept=".csv, .xlsx"
                    onChange={(event) => {
                    handleFileUpload(event.currentTarget.files[0]); addDataForm.handleChange(event)
                    }} ref={chckFile}
                    className={'form-control '+(checkFileFormat === 1 || isFileEmpty ? 'is-invalid' : null)}
                    placeholder="Enter full name"
                  />
                  {
                    checkFileFormat === 1 || isFileEmpty ? <small className="form-text text-muted">
                    Incorrect File Formate
                  </small> : null
                  }
                </div>
                <div className="mb-3">
                  <select name='bank' onChange={addDataForm.handleChange} className={'form-control '+(addDataForm.errors.bank && addDataForm.touched.bank ? 'is-invalid' : '')}>
                    <option>Select Bank Name</option>
                    {
                      banks?.map((value, index)=>(
                        <option key={index}>{value?.bank}</option>
                      ))
                    }
                  </select>
                  {
                    addDataForm.errors.bank && addDataForm.touched.bank ? <small className="form-text text-muted">
                    {addDataForm.errors.bank}
                  </small> : null
                  }
                </div>
                
            </div>
            <div className="card-footer text-right">
              <button type='submit' onClick={()=>{checkFileFormat === 0 ? setIsFileEmpty(true) : setIsFileEmpty(false) }}  disabled={checkFileFormat === 1 ? true : false} className='btn btn-primary '>Submit</button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    </>
  )
}

export default AddData