import React, { useEffect, useRef, useState } from 'react'
import Header from '../../shared/Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { handleDeleteMember, resetState } from '../../../../redux/AdminDataSlice';
import ViewPassModal from './ViewPassModal'

const MembersList = () => {

  const [finalData, setFinalData] = useState([]);
  const memberData = useSelector(state => state.AdminDataSlice.member)
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const isFullfilled = useSelector(state => state.AdminDataSlice?.isFullfilled)
  const clsModal = useRef();


  const findMember = (query) => {
    if (query) {
      const lowercasedQuery = query.toLowerCase();
      setFinalData(
        memberData?.filter((value) =>
          value.member_name.toLowerCase().includes(lowercasedQuery)
        )
      );
    } else {
      setFinalData(memberData); // Reset to original data if query is empty
    }
  };

  const handleSearchChange  = (event) =>{
    setSearchQuery(event);
    findMember(event);
  }
  
  const deleteMember = () =>{
    dispatch(handleDeleteMember(userData))
  }

  useEffect(()=>{
    setFinalData(memberData)
  }, [memberData])
  
  useEffect(()=>{
    if(isFullfilled) {
      clsModal.current.click();
      dispatch(resetState())
    }
  }, [isFullfilled])

  return (
    <>
      <Header />

      <div className="container my-5">
        <div className="row">
          <div className="col-md-12">
          <div className="card">
  <div className="card-header">
    <h3>Members List</h3>
  </div>
  <div className="card-body">
    <div className="dt-responsive table-responsive">
      <div
        id="table-style-hover_wrapper"
        className="dt-container dt-bootstrap5"
      >
        <div className="row mt-2 justify-content-between">
          <div className="col-md-auto me-auto ">
            <div className="dt-length">
              <select
                name="table-style-hover_length"
                aria-controls="table-style-hover"
                className="form-select form-select-sm"
                id="dt-length-3"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <label htmlFor="dt-length-3"> entries per page</label>
            </div>
          </div>
          <div className="col-md-auto ms-auto ">
            <div className="dt-search">
              <label htmlFor="dt-search-3">Search:</label>
              <input
                type="search"
                className="form-control form-control-sm"
                id="dt-search-3"
                placeholder=""
                aria-controls="table-style-hover"
                value={searchQuery}
                onChange={(event)=>{handleSearchChange (event.target.value)}}
              />
            </div>
          </div>
        </div>
        <div className="row mt-2 justify-content-md-center">
          <div className="col-12 ">
            <table
              id="table-style-hover"
              className="table table-striped my-3 table-hover table-bordered nowrap dataTable"
              aria-describedby="table-style-hover_info"
              style={{ width: "851.333px" }}
            >
              <colgroup>
                <col style={{ width: "164.646px" }} />
                <col style={{ width: "238.385px" }} />
                <col style={{ width: "128.594px" }} />
                <col style={{ width: "77.2708px" }} />
                <col style={{ width: "134.375px" }} />
                <col style={{ width: "108.062px" }} />
              </colgroup>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Member Name</th>
                  <th>Member Phone</th>
                  <th>Member Email</th>
                  <th>Address</th>
                  <th>Created at</th>
                  <th>Status</th>
                  <th>Password</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  finalData?.map((value, index) => (
                      <tr key={index}>
                      <td className="sorting_1">{index+1}</td>
                      <td>{value?.member_name}</td>
                      <td>{value?.member_phone}</td>
                      <td className="dt-type-numeric">{value?.member_email}</td>
                      <td className="dt-type-date">{value?.address}</td>
                      <td className="dt-type-numeric">{value?.formatdate}</td>
                      <td className="dt-type-numeric"></td>
                      <td className="dt-type-numeric"><button className='btn btn-sm btn-outline-secondary' data-bs-toggle="modal"
                        data-bs-target="#viewModal" onClick={()=>{setUserData(value)}} type='button' >View</button></td>
                      <td className="dt-type-numeric"><button className='btn btn-sm btn-danger' onClick={()=>{setUserData(value)}} type='button' data-bs-target="#deleteModal" data-bs-toggle="modal" >Delete</button></td>
                  </tr>
                  ))
                }
              </tbody>
              {/* <tfoot>
                <tr role="row">
                  <th data-dt-column={0} rowSpan={1} colSpan={1}>
                    <span className="dt-column-title">Name</span>
                  </th>
                  <th data-dt-column={1} rowSpan={1} colSpan={1}>
                    <span className="dt-column-title">Position</span>
                  </th>
                  <th data-dt-column={2} rowSpan={1} colSpan={1}>
                    <span className="dt-column-title">Office</span>
                  </th>
                  <th
                    data-dt-column={3}
                    rowSpan={1}
                    colSpan={1}
                    className="dt-type-numeric"
                  >
                    <span className="dt-column-title">Age</span>
                  </th>
                  <th
                    data-dt-column={4}
                    rowSpan={1}
                    colSpan={1}
                    className="dt-type-date"
                  >
                    <span className="dt-column-title">Start date</span>
                  </th>
                  <th
                    data-dt-column={5}
                    rowSpan={1}
                    colSpan={1}
                    className="dt-type-numeric"
                  >
                    <span className="dt-column-title">Salary</span>
                  </th>
                </tr>
              </tfoot> */}
            </table>
          </div>
        </div>
        <div className="row mt-2 justify-content-between">
          <div className="col-md-auto me-auto ">
            <div
              className="dt-info"
              aria-live="polite"
              id="table-style-hover_info"
              role="status"
            >
              Showing 1 to 10 of 30 entries
            </div>
          </div>
          <div className="col-md-auto ms-auto ">
            <div className="dt-paging paging_full_numbers">
              <ul className="pagination">
                <li className="dt-paging-button page-item disabled">
                  <a
                    className="page-link first"
                    aria-controls="table-style-hover"
                    aria-disabled="true"
                    aria-label="First"
                    data-dt-idx="first"
                    tabIndex={-1}
                  >
                    «
                  </a>
                </li>
                <li className="dt-paging-button page-item disabled">
                  <a
                    className="page-link previous"
                    aria-controls="table-style-hover"
                    aria-disabled="true"
                    aria-label="Previous"
                    data-dt-idx="previous"
                    tabIndex={-1}
                  >
                    ‹
                  </a>
                </li>
                <li className="dt-paging-button page-item active">
                  <a
                    href="#"
                    className="page-link"
                    aria-controls="table-style-hover"
                    aria-current="page"
                    data-dt-idx={0}
                    tabIndex={0}
                  >
                    1
                  </a>
                </li>
                <li className="dt-paging-button page-item">
                  <a
                    href="#"
                    className="page-link"
                    aria-controls="table-style-hover"
                    data-dt-idx={1}
                    tabIndex={0}
                  >
                    2
                  </a>
                </li>
                <li className="dt-paging-button page-item">
                  <a
                    href="#"
                    className="page-link"
                    aria-controls="table-style-hover"
                    data-dt-idx={2}
                    tabIndex={0}
                  >
                    3
                  </a>
                </li>
                <li className="dt-paging-button page-item">
                  <a
                    href="#"
                    className="page-link next"
                    aria-controls="table-style-hover"
                    aria-label="Next"
                    data-dt-idx="next"
                    tabIndex={0}
                  >
                    ›
                  </a>
                </li>
                <li className="dt-paging-button page-item">
                  <a
                    href="#"
                    className="page-link last"
                    aria-controls="table-style-hover"
                    aria-label="Last"
                    data-dt-idx="last"
                    tabIndex={0}
                  >
                    »
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

          </div>
        </div>
      </div>


      

  <ViewPassModal props={userData} />
  {/* <div
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
            userData ? (
              <>
                <h5>Name : {userData?.member_name}</h5>
                <h5>Email ID : {userData?.member_email}</h5>
                <h5>Password : {userData?.password} <button className='btn' onClick={()=>{navigator.clipboard.writeText(userData?.password)}}><i class="fa-regular fa-copy"></i></button></h5>
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
  </div> */}


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
            Are You Sure, You Want to Delete {userData ? userData?.member_name : null}
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
            onClick={deleteMember}
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

export default MembersList