import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleDeleteMember, resetState } from '../../../../redux/AdminDataSlice'

const 
DeleteMemberModal = (props) => {

    const dispatch = useDispatch()
    const isFullfilled = useSelector(state => state.AdminDataSlice?.isFullfilled)
    const clsModal = useRef();

    const deleteMember = () =>{
      dispatch(handleDeleteMember(props?.props))
    }

    useEffect(()=>{
        if(isFullfilled) {
          clsModal.current.click();
          dispatch(resetState())
        }
      }, [isFullfilled])    

  return (
    <>
         <div className="overlay-suds" id="deleteModal">
    <div className="popup-suds">
      <h4>Are You Sure, You Want to Delete {props?.props ? props?.props?.member_name : null}</h4>
      <div className="footer">
      <button
            onClick={()=>document.getElementById('deleteModal').classList.remove('show')}
            className="btn-md btn btn-secondary"
            ref={clsModal}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-md btn-danger"
            onClick={deleteMember}
          >
            Delete
          </button>
      </div>
    </div>
  </div>
    </>
  )
}

export default DeleteMemberModal