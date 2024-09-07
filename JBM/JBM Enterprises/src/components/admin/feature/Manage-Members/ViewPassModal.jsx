import React from 'react'

const ViewPassModal = (props) => {


  return (
    <>
         <div
    className="modal fade"
    id="viewModal"
    tabIndex={-1}
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">
            Member Password
          </h1>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          {
            props.props ? (
              <>
                <h5>Name : {props?.props?.member_name}</h5>
                <h5>Email ID : {props?.props?.member_email}</h5>
                <h5>Password : {props?.props?.password} <button className='btn' onClick={()=>{navigator.clipboard.writeText(userData?.password)}}><i class="fa-regular fa-copy"></i></button></h5>
              </>
            ) : null
          }
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
    </>
  )
}

export default ViewPassModal