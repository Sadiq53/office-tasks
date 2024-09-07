import React from 'react'
import Header from '../../shared/Header/Header'

const Dashboard = () => {
  return (
    <>

    <Header />

  {/* [ Main Content ] start */}
  <div className="pc-container">
    <div className="pc-content">
      {/* [ breadcrumb ] start */}
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-md-12">
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="https://html.phoenixcoded.net/light-able/bootstrap/dashboard/index.html">
                    Home
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a href="javascript: void(0)">Layout</a>
                </li>
                <li className="breadcrumb-item" aria-current="page">
                  Layout Horizontal
                </li>
              </ul>
            </div>
            <div className="col-md-12">
              <div className="page-header-title">
                <h2 className="mb-0">Layout Horizontal</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* [ breadcrumb ] end */}
      {/* [ Main Content ] start */}
      <div className="row">
        {/* [ sample-page ] start */}
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header">
              <h5>Hello card</h5>
            </div>
            <div className="card-body">
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h5>Hello card</h5>
            </div>
            <div className="card-body">
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
              </p>
            </div>{" "}
          </div>
          <div className="card">
            <div className="card-header">
              <h5>Hello card</h5>
            </div>
            <div className="card-body">
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
              </p>
            </div>{" "}
          </div>
          <div className="card">
            <div className="card-header">
              <h5>Hello card</h5>
            </div>
            <div className="card-body">
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
              </p>
            </div>
          </div>
        </div>
        {/* [ sample-page ] end */}
      </div>
      {/* [ Main Content ] end */}
    </div>
  </div>
  {/* [ Main Content ] end */}
</>

  )
}

export default Dashboard