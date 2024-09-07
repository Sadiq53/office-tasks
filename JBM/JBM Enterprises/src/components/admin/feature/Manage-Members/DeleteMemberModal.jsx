import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleDeleteMember, resetState } from '../../../../redux/AdminDataSlice'

const DeleteMemberModal = (props) => {

    const dispatch = useDispatch()
    const isFullfilled = useSelector(state => state.AdminDataSlice?.isFullfilled)
    const clsModal = useRef();

    useEffect(()=>{
        if(isFullfilled) {
          clsModal.current.click();
          dispatch(resetState())
        }
      }, [isFullfilled])    

  return (
    <>
         <div
    className="modal fade"
    id="deleteModal"
    tabIndex={-1}
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">
            Are You Sure, You Want to Delete {props?.props ? props?.props?.member_name : null}
          </h1>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            ref={clsModal}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={dispatch(handleDeleteMember(props?.props))}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
    </>
  )
}

export default DeleteMemberModal