import React, { useEffect } from 'react'
import Header from '../../shared/Header/Header'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Dashboard = () => {

  const memberData = useSelector(state => state.AdminDataSlice.member);
  const bankData = useSelector(state => state.AdminDataSlice.bank);

  return (
    <>

    <Header />

    <div className="container my-5">
    <div className="row">
  {/* [ Row 1 ] start */}
  <div className="col-sm-6 col-xl-4">
    <NavLink to='/members-list'>
    <div className="card statistics-card-1">
      <div className="card-header d-flex align-items-center justify-content-between py-3">
        <h5>Total Members</h5>
      </div>
      <div className="card-body">
        <img
          src="/assets/images/widget/img-status-1.svg"
          alt="img"
          className="img-fluid img-bg h-100"
        />
        <div className="d-flex align-items-center">
          <h3 className="f-w-300 d-flex align-items-center m-b-0">
            {memberData?.length}<small className="text-muted"> Total Count</small>
          </h3>
        </div>
        <div className="progress" style={{ height: 7 }}>
          <div
            className="progress-bar bg-brand-color-2"
            role="progressbar"
            style={{ width: "100%" }}
            aria-valuenow={75}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    </div>
    </NavLink>
  </div>
  <div className="col-sm-6 col-xl-4">
    <NavLink to='/bank-list'>
    <div className="card statistics-card-1">
      <div className="card-header d-flex align-items-center justify-content-between py-3">
        <h5>Banks</h5>
      </div>
      <div className="card-body">
        <img
          src="/assets/images/widget/img-status-2.svg"
          alt="img"
          className="img-fluid img-bg"
        />
        <div className="d-flex align-items-center">
          <h3 className="f-w-300 d-flex align-items-center m-b-0">
            {bankData?.length}<small className="text-muted"> Total Count</small>
          </h3>
        </div>
        <div className="progress" style={{ height: 7 }}>
          <div
            className="progress-bar bg-brand-color-1"
            role="progressbar"
            style={{ width: "100%" }}
            aria-valuenow={75}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    </div>
    </NavLink>
  </div>
  <div className="col-sm-6 col-xl-4">
    <div className="card statistics-card-1">
      <div className="card-header d-flex align-items-center justify-content-between py-3">
        <h5>Return Orders</h5>
        <div className="dropdown">
          <a
            className="avtar avtar-xs btn-link-secondary dropdown-toggle arrow-none"
            href="#"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="material-icons-two-tone f-18">more_vert</i>
          </a>
          <div className="dropdown-menu dropdown-menu-end">
            <a className="dropdown-item" href="#">
              View
            </a>
            <a className="dropdown-item" href="#">
              Edit
            </a>
          </div>
        </div>
      </div>
      <div className="card-body">
        <img
          src="/assets/images/widget/img-status-3.svg"
          alt="img"
          className="img-fluid img-bg"
        />
        <div className="d-flex align-items-center">
          <h3 className="f-w-300 d-flex align-items-center m-b-0">
            50 <small className="text-muted">/400</small>
          </h3>
          <span className="badge bg-light-danger ms-2">10%</span>
        </div>
        <p className="text-muted mb-2 text-sm mt-3">Return Orders</p>
        <div className="progress" style={{ height: 7 }}>
          <div
            className="progress-bar bg-brand-color-3"
            role="progressbar"
            style={{ width: "75%" }}
            aria-valuenow={75}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    </div>
  </div>
  {/* [ Row 1 ] end */}

  {/* [ Row 2 ] start */}
  <div className="col-sm-6 col-xl-4">
    <NavLink to='/members-list'>
    <div className="card statistics-card-1">
      <div className="card-header d-flex align-items-center justify-content-between py-3">
        <h5>Total Members</h5>
      </div>
      <div className="card-body">
        <img
          src="/assets/images/widget/img-status-1.svg"
          alt="img"
          className="img-fluid img-bg h-100"
        />
        <div className="d-flex align-items-center">
          <h3 className="f-w-300 d-flex align-items-center m-b-0">
            237 <small className="text-muted">/400</small>
          </h3>
          <span className="badge bg-light-success ms-2">36%</span>
        </div>
        <p className="text-muted mb-2 text-sm mt-3">Delivery Orders</p>
        <div className="progress" style={{ height: 7 }}>
          <div
            className="progress-bar bg-brand-color-2"
            role="progressbar"
            style={{ width: "75%" }}
            aria-valuenow={75}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    </div>
    </NavLink>
  </div>
  <div className="col-sm-6 col-xl-4">
    <NavLink to='/bank-list'>
    <div className="card statistics-card-1">
      <div className="card-header d-flex align-items-center justify-content-between py-3">
        <h5>Banks</h5>
      </div>
      <div className="card-body">
        <img
          src="/assets/images/widget/img-status-2.svg"
          alt="img"
          className="img-fluid img-bg"
        />
        <div className="d-flex align-items-center">
          <h3 className="f-w-300 d-flex align-items-center m-b-0">
            100 <small className="text-muted">/500</small>
          </h3>
          <span className="badge bg-light-primary ms-2">20%</span>
        </div>
        <p className="text-muted mb-2 text-sm mt-3">Delivery Orders</p>
        <div className="progress" style={{ height: 7 }}>
          <div
            className="progress-bar bg-brand-color-1"
            role="progressbar"
            style={{ width: "75%" }}
            aria-valuenow={75}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    </div>
    </NavLink>
  </div>
  <div className="col-sm-6 col-xl-4">
    <div className="card statistics-card-1">
      <div className="card-header d-flex align-items-center justify-content-between py-3">
        <h5>Return Orders</h5>
        <div className="dropdown">
          <a
            className="avtar avtar-xs btn-link-secondary dropdown-toggle arrow-none"
            href="#"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="material-icons-two-tone f-18">more_vert</i>
          </a>
          <div className="dropdown-menu dropdown-menu-end">
            <a className="dropdown-item" href="#">
              View
            </a>
            <a className="dropdown-item" href="#">
              Edit
            </a>
          </div>
        </div>
      </div>
      <div className="card-body">
        <img
          src="/assets/images/widget/img-status-3.svg"
          alt="img"
          className="img-fluid img-bg"
        />
        <div className="d-flex align-items-center">
          <h3 className="f-w-300 d-flex align-items-center m-b-0">
            50 <small className="text-muted">/400</small>
          </h3>
          <span className="badge bg-light-danger ms-2">10%</span>
        </div>
        <p className="text-muted mb-2 text-sm mt-3">Return Orders</p>
        <div className="progress" style={{ height: 7 }}>
          <div
            className="progress-bar bg-brand-color-3"
            role="progressbar"
            style={{ width: "75%" }}
            aria-valuenow={75}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    </div>
  </div>
  {/* [ Row 2 ] end */}
  
</div>
    </div>

</>

  )
}

export default Dashboard