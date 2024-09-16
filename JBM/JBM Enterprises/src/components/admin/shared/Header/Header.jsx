import React, { useEffect, useRef, useState } from 'react'
import {NavLink} from 'react-router-dom'

const Header = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside the sidebar
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
  {/* [ Pre-loader ] start */}
  <div className="loader-bg">
    <div className="loader-track">
      <div className="loader-fill" />
    </div>
  </div>
  {/* [ Pre-loader ] End */}
  
  {/* [ Sidebar Menu ] start */}
  <nav  
   ref={sidebarRef}
   className={` pc-sidebar rel ${isSidebarOpen ? 'mob-sidebar-active' : ''}`}
  id='toggle-mob'>
    <div className="navbar-wrapper">
      <div className="m-header">
        <NavLink to='/'
          className="b-brand text-primary"
        >
          {/* ========   Change your logo from here   ============ */}
          <img
            src="/assets/images/logo.png"
            alt="logo image"
            className="logo-lg width-6"
          />
          {/* <span className="badge bg-brand-color-2 rounded-pill ms-2 theme-version">
            v1.2.0
          </span> */}
        </NavLink>
      </div>
      <div className="navbar-content">
        <ul className="pc-navbar">
          <li className="pc-item pc-caption">
            {/* <label>Navigation</label> */}
            <i className="ph-duotone ph-gauge" />
          </li>
          <li className="pc-item pc-hasmenu">
            <NavLink to="/" className="pc-link">
              <span className="pc-micon">
                <i className="ph-duotone ph-gauge" />
              </span>
              <span className="pc-mtext">Dashboard</span>
              <span className="pc-arrow">
                <i data-feather="chevron-right" />
              </span>
              <span className="pc-badge">2</span>
            </NavLink>
            {/* <ul className="pc-submenu">
              <li className="pc-item">
                <a
                  className="pc-link"
                  href="https://html.phoenixcoded.net/light-able/bootstrap/dashboard/index.html"
                >
                  Analytics
                </a>
              </li>
              <li className="pc-item">
                <a
                  className="pc-link"
                  href="https://html.phoenixcoded.net/light-able/bootstrap/dashboard/affiliate.html"
                >
                  Affiliate
                </a>
              </li>
              <li className="pc-item">
                <a
                  className="pc-link"
                  href="https://html.phoenixcoded.net/light-able/bootstrap/dashboard/finance.html"
                >
                  Finance
                </a>
              </li>
              <li className="pc-item">
                <a
                  className="pc-link"
                  href="https://html.phoenixcoded.net/light-able/bootstrap/admins/helpdesk-dashboard.html"
                >
                  Helpdesk
                </a>
              </li>
              <li className="pc-item">
                <a
                  className="pc-link"
                  href="https://html.phoenixcoded.net/light-able/bootstrap/dashboard/invoice.html"
                >
                  Invoice
                </a>
              </li>
            </ul> */}
          </li>
          <li className="pc-item pc-hasmenu">
            <NavLink to="/members-list" className="pc-link">
              <span className="pc-micon">
              <img className='width-100' src='/assets/images/menu-icons/manage membwr.png' />
              </span>
              <span className="pc-mtext"> Manage Members</span>
              <span className="pc-arrow">
                <i data-feather="chevron-right" />
              </span>
            </NavLink>
            <ul className="pc-submenu">
              <li className="pc-item">
                <NavLink 
                  className="pc-link list-flex"
                  to='/add-members'
                >
                <img src='/assets/images/menu-icons/add members.png' />
                  Add Member
                </NavLink>
              </li>
              <li className="pc-item ">
                <NavLink
                  className="pc-link list-flex"
                  to='/members-list'
                >
                <img src='/assets/images/menu-icons/members list.png' />
                  Members List
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="pc-item pc-hasmenu">
            <NavLink to="/bank-list" className="pc-link">
              <span className="pc-micon">
              <img className='width-100' src='/assets/images/menu-icons/manage bank.png' />
              </span>
              <span className="pc-mtext">Manage Bank</span>
              <span className="pc-arrow">
                <i data-feather="chevron-right" />
              </span>
            </NavLink>
            <ul className="pc-submenu">
              <li className="pc-item">
                <NavLink
                  className="pc-link list-flex"
                  to='/add-bank'
                >
                <img src='/assets/images/menu-icons/add bank.png' />
                  Add Bank
                </NavLink>
              </li>
              <li className="pc-item">
                <NavLink
                  className="pc-link list-flex"
                  to='/bank-list'
                >
                <img src='/assets/images/menu-icons/bank list.png' />
                  Bank List
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="pc-item pc-hasmenu">
            <NavLink to="/data-list" className="pc-link">
              <span className="pc-micon">
              <img className='width-100' src='/assets/images/menu-icons/manage data.png' />
              </span>
              <span className="pc-mtext">Manage Data</span>
              <span className="pc-arrow">
                <i data-feather="chevron-right" />
              </span>
            </NavLink>
            <ul className="pc-submenu">
              <li className="pc-item">
                <NavLink
                  className="pc-link list-flex"
                  to='/add-data'
                >
                    <img src='/assets/images/menu-icons/Add data.png' />
                    Add Data
                </NavLink>
              </li>
              <li className="pc-item">
                <NavLink
                  className="pc-link list-flex"
                  to='/data-list'
                >
                    <img src='/assets/images/menu-icons/data list.png' />
                    Data List
                </NavLink>
              </li>
              <li className="pc-item">
                <NavLink
                  className="pc-link list-flex"
                  to='/manage-tags'
                >
                    <img src='/assets/images/menu-icons/manage dashboard tags.png' />
                    Manage Dashboard Tags
                </NavLink>
              </li>
              <li className="pc-item">
                <NavLink
                  className="pc-link list-flex"
                  to='/delete-data'
                >
                    <img src='/assets/images/menu-icons/delete data.png' />
                    Delete Data
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="pc-item pc-hasmenu">
            <NavLink to="/" className="pc-link">
              <span className="pc-micon">
              <img className='width-100' src='/assets/images/menu-icons/location.png' />
              </span>
              <span className="pc-mtext">Manage Location</span>
              <span className="pc-arrow">
                <i data-feather="chevron-right" />
              </span>
            </NavLink>
            <ul className="pc-submenu">
              <li className="pc-item">
                <NavLink
                  className="pc-link list-flex"
                  to='/members-list'
                >
                    <img src='/assets/images/menu-icons/members list.png' />
                  Members List
                </NavLink>
              </li>
            </ul>
          </li>
          
        </ul>
        {/* <div className="card nav-action-card bg-brand-color-4">
          <div
            className="card-body"
            style={{
              backgroundImage:
                'url("https://html.phoenixcoded.net/light-able/bootstrap/assets/images/layout/nav-card-bg.svg")'
            }}
          >
            <h5 className="text-dark">Help Center</h5>
            <p className="text-dark text-opacity-75">
              Please contact us for more questions.
            </p>
            <a
              href="https://phoenixcoded.support-hub.io/"
              className="btn btn-primary"
              target="_blank"
            >
              Go to help Center
            </a>
          </div>
        </div> */}
      </div>
      {/* <div className="card pc-user-card">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0">
              <img 
                src="/assets/images/user/avatar-1.jpg"
                alt="user-image"
                className="user-avtar wid-45 rounded-circle"
              />
            </div>
            <div className="flex-grow-1 ms-3">
              <div className="dropdown">
                <a
                  href="#"
                  className="arrow-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  data-bs-offset="0,20"
                >
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 me-2">
                      <h6 className="mb-0">Jonh Smith</h6>
                      <small>Administrator</small>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="btn btn-icon btn-link-secondary avtar">
                        <i className="ph-duotone ph-windows-logo" />
                      </div>
                    </div>
                  </div>
                </a>
                <div className="dropdown-menu">
                  <ul>
                    <li>
                      <a className="pc-user-links">
                        <i className="ph-duotone ph-user" />
                        <span>My Account</span>
                      </a>
                    </li>
                    <li>
                      <a className="pc-user-links">
                        <i className="ph-duotone ph-gear" />
                        <span>Settings</span>
                      </a>
                    </li>
                    <li>
                      <a className="pc-user-links">
                        <i className="ph-duotone ph-lock-key" />
                        <span>Lock Screen</span>
                      </a>
                    </li>
                    <li>
                      <a className="pc-user-links">
                        <i className="ph-duotone ph-power" />
                        <span>Logout</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  </nav>
  {/* [ Sidebar Menu ] end */}




  {/* [ Header Topbar ] start */}
  <header className="pc-header abs">
    <div className="header-wrapper">
      {" "}
      {/* [Mobile Media Block] start */}
      <div className="me-auto pc-mob-drp">
        <ul className="list-unstyled">
          {/* ======= Menu collapse Icon ===== */}
          <li className="pc-h-item pc-sidebar-collapse">
            <button  className="pc-head-link ms-0"  id="sidebar-hide">
              <i className="ti ti-menu-2" />
            </button>
          </li>
          <li className="pc-h-item pc-sidebar-popup">
            <button  className="pc-head-link ms-0" onClick={() => setIsSidebarOpen(true)} id="mobile-collapse">
              <i className="ti ti-menu-2" />
            </button>
          </li>
          <li className="dropdown pc-h-item d-inline-flex d-md-none">
            <a
              className="pc-head-link dropdown-toggle arrow-none m-0"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="false"
              aria-expanded="false"
            >
              <i className="ph-duotone ph-magnifying-glass" />
            </a>
            <div className="dropdown-menu pc-h-dropdown drp-search">
              <form className="px-3">
                <div className="mb-0 d-flex align-items-center">
                  <input
                    type="search"
                    className="form-control border-0 shadow-none"
                    placeholder="Search..."
                  />
                  <button className="btn btn-light-secondary btn-search">
                    Search
                  </button>
                </div>
              </form>
            </div>
          </li>
          <li className="pc-h-item d-none d-md-inline-flex">
            <form className="form-search">
              <i className="ph-duotone ph-magnifying-glass icon-search" />
              <input
                type="search"
                className="form-control"
                placeholder="Search..."
              />
              <button className="btn btn-search" style={{ padding: 0 }}>
                <kbd>ctrl+k</kbd>
              </button>
            </form>
          </li>
        </ul>
      </div>
      {/* [Mobile Media Block end] */}
      <div className="ms-auto">
        <ul className="list-unstyled">
          <li className="dropdown pc-h-item d-none d-md-inline-flex">
            <a
              className="pc-head-link dropdown-toggle arrow-none me-0"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="false"
              aria-expanded="false"
            >
              <i className="ph-duotone ph-circles-four" />
            </a>
            <div className="dropdown-menu dropdown-qta dropdown-menu-end pc-h-dropdown">
              <div className="overflow-hidden">
                <div className="qta-links m-n1">
                  <a href="#!" className="dropdown-item">
                    <i className="ph-duotone ph-shopping-cart" />
                    <span>E-commerce</span>
                  </a>
                  <a href="#!" className="dropdown-item">
                    <i className="ph-duotone ph-lifebuoy" />
                    <span>Helpdesk</span>
                  </a>
                  <a href="#!" className="dropdown-item">
                    <i className="ph-duotone ph-scroll" />
                    <span>Invoice</span>
                  </a>
                  <a href="#!" className="dropdown-item">
                    <i className="ph-duotone ph-books" />
                    <span>Online Courses</span>
                  </a>
                  <a href="#!" className="dropdown-item">
                    <i className="ph-duotone ph-envelope-open" />
                    <span>Mail</span>
                  </a>
                  <a href="#!" className="dropdown-item">
                    <i className="ph-duotone ph-identification-badge" />
                    <span>Membership</span>
                  </a>
                  <a href="#!" className="dropdown-item">
                    <i className="ph-duotone ph-chats-circle" />
                    <span>Chat</span>
                  </a>
                  <a href="#!" className="dropdown-item">
                    <i className="ph-duotone ph-currency-circle-dollar" />
                    <span>Plans</span>
                  </a>
                  <a href="#!" className="dropdown-item">
                    <i className="ph-duotone ph-user-circle" />
                    <span>Users</span>
                  </a>
                </div>
              </div>
            </div>
          </li>
          <li className="dropdown pc-h-item">
            <a
              className="pc-head-link dropdown-toggle arrow-none me-0"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="false"
              aria-expanded="false"
            >
              <i className="ph-duotone ph-sun-dim" />
            </a>
            <div className="dropdown-menu dropdown-menu-end pc-h-dropdown">
              <a
                href="#!"
                className="dropdown-item"
                onclick="layout_change('dark')"
              >
                <i className="ph-duotone ph-moon" />
                <span>Dark</span>
              </a>
              <a
                href="#!"
                className="dropdown-item"
                onclick="layout_change('light')"
              >
                <i className="ph-duotone ph-sun-dim" />
                <span>Light</span>
              </a>
              <a
                href="#!"
                className="dropdown-item"
                onclick="layout_change_default()"
              >
                <i className="ph-duotone ph-cpu" />
                <span>Default</span>
              </a>
            </div>
          </li>
          <li className="pc-h-item">
            <a
              className="pc-head-link pct-c-btn"
              href="#"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvas_pc_layout"
            >
              <i className="ph-duotone ph-gear-six" />
            </a>
          </li>
          <li className="dropdown pc-h-item">
            <a
              className="pc-head-link dropdown-toggle arrow-none me-0"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="false"
              aria-expanded="false"
            >
              <i className="ph-duotone ph-diamonds-four" />
            </a>
            <div className="dropdown-menu dropdown-menu-end pc-h-dropdown">
              <a href="#!" className="dropdown-item">
                <i className="ph-duotone ph-user" />
                <span>My Account</span>
              </a>
              <a href="#!" className="dropdown-item">
                <i className="ph-duotone ph-gear" />
                <span>Settings</span>
              </a>
              <a href="#!" className="dropdown-item">
                <i className="ph-duotone ph-lifebuoy" />
                <span>Support</span>
              </a>
              <a href="#!" className="dropdown-item">
                <i className="ph-duotone ph-lock-key" />
                <span>Lock Screen</span>
              </a>
              <a href="#!" className="dropdown-item">
                <i className="ph-duotone ph-power" />
                <span>Logout</span>
              </a>
            </div>
          </li>
          <li className="dropdown pc-h-item">
            <a
              className="pc-head-link dropdown-toggle arrow-none me-0"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="false"
              aria-expanded="false"
            >
              <i className="ph-duotone ph-bell" />
              <span className="badge bg-success pc-h-badge">3</span>
            </a>
            <div className="dropdown-menu dropdown-notification dropdown-menu-end pc-h-dropdown">
              <div className="dropdown-header d-flex align-items-center justify-content-between">
                <h5 className="m-0">Notifications</h5>
                <ul className="list-inline ms-auto mb-0">
                  <li className="list-inline-item">
                    <a
                      href="https://html.phoenixcoded.net/light-able/bootstrap/application/mail.html"
                      className="avtar avtar-s btn-link-hover-primary"
                    >
                      <i className="ti ti-link f-18" />
                    </a>
                  </li>
                </ul>
              </div>
              <div
                className="dropdown-body text-wrap header-notification-scroll position-relative"
                style={{ maxHeight: "calc(100vh - 235px)" }}
              >
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <p className="text-span">Today</p>
                    <div className="d-flex">
                      <div className="flex-shrink-0">
                        <img
                          src="/assets/images/user/avatar-2.jpg"
                          alt="user-image"
                          className="user-avtar avtar avtar-s"
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <div className="d-flex">
                          <div className="flex-grow-1 me-3 position-relative">
                            <h6 className="mb-0 text-truncate">
                              Keefe Bond added new tags to 💪 Design system
                            </h6>
                          </div>
                          <div className="flex-shrink-0">
                            <span className="text-sm">2 min ago</span>
                          </div>
                        </div>
                        <p className="position-relative mt-1 mb-2">
                          <br />
                          <span className="text-truncate">
                            Lorem Ipsum has been the industry's standard dummy
                            text ever since the 1500s.
                          </span>
                        </p>
                        <span className="badge bg-light-primary border border-primary me-1 mt-1">
                          web design
                        </span>
                        <span className="badge bg-light-warning border border-warning me-1 mt-1">
                          Dashobard
                        </span>
                        <span className="badge bg-light-success border border-success me-1 mt-1">
                          Design System
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="d-flex">
                      <div className="flex-shrink-0">
                        <div className="avtar avtar-s bg-light-primary">
                          <i className="ph-duotone ph-chats-teardrop f-18" />
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <div className="d-flex">
                          <div className="flex-grow-1 me-3 position-relative">
                            <h6 className="mb-0 text-truncate">Message</h6>
                          </div>
                          <div className="flex-shrink-0">
                            <span className="text-sm">1 hour ago</span>
                          </div>
                        </div>
                        <p className="position-relative mt-1 mb-2">
                          <br />
                          <span className="text-truncate">
                            Lorem Ipsum has been the industry's standard dummy
                            text ever since the 1500s.
                          </span>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <p className="text-span">Yesterday</p>
                    <div className="d-flex">
                      <div className="flex-shrink-0">
                        <div className="avtar avtar-s bg-light-danger">
                          <i className="ph-duotone ph-user f-18" />
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <div className="d-flex">
                          <div className="flex-grow-1 me-3 position-relative">
                            <h6 className="mb-0 text-truncate">
                              Challenge invitation
                            </h6>
                          </div>
                          <div className="flex-shrink-0">
                            <span className="text-sm">12 hour ago</span>
                          </div>
                        </div>
                        <p className="position-relative mt-1 mb-2">
                          <br />
                          <span className="text-truncate">
                            <strong> Jonny aber </strong> invites to join the
                            challenge
                          </span>
                        </p>
                        <button className="btn btn-sm rounded-pill btn-outline-secondary me-2">
                          Decline
                        </button>
                        <button className="btn btn-sm rounded-pill btn-primary">
                          Accept
                        </button>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="d-flex">
                      <div className="flex-shrink-0">
                        <div className="avtar avtar-s bg-light-info">
                          <i className="ph-duotone ph-notebook f-18" />
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <div className="d-flex">
                          <div className="flex-grow-1 me-3 position-relative">
                            <h6 className="mb-0 text-truncate">Forms</h6>
                          </div>
                          <div className="flex-shrink-0">
                            <span className="text-sm">2 hour ago</span>
                          </div>
                        </div>
                        <p className="position-relative mt-1 mb-2">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="d-flex">
                      <div className="flex-shrink-0">
                        <img
                          src="/assets/images/user/avatar-2.jpg"
                          alt="user-image"
                          className="user-avtar avtar avtar-s"
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <div className="d-flex">
                          <div className="flex-grow-1 me-3 position-relative">
                            <h6 className="mb-0 text-truncate">
                              Keefe Bond added new tags to 💪 Design system
                            </h6>
                          </div>
                          <div className="flex-shrink-0">
                            <span className="text-sm">2 min ago</span>
                          </div>
                        </div>
                        <p className="position-relative mt-1 mb-2">
                          <br />
                          <span className="text-truncate">
                            Lorem Ipsum has been the industry's standard dummy
                            text ever since the 1500s.
                          </span>
                        </p>
                        <button className="btn btn-sm rounded-pill btn-outline-secondary me-2">
                          Decline
                        </button>
                        <button className="btn btn-sm rounded-pill btn-primary">
                          Accept
                        </button>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="d-flex">
                      <div className="flex-shrink-0">
                        <div className="avtar avtar-s bg-light-success">
                          <i className="ph-duotone ph-shield-checkered f-18" />
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <div className="d-flex">
                          <div className="flex-grow-1 me-3 position-relative">
                            <h6 className="mb-0 text-truncate">Security</h6>
                          </div>
                          <div className="flex-shrink-0">
                            <span className="text-sm">5 hour ago</span>
                          </div>
                        </div>
                        <p className="position-relative mt-1 mb-2">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s.
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="dropdown-footer">
                <div className="row g-3">
                  <div className="col-6">
                    <div className="d-grid">
                      <button className="btn btn-primary">Archive all</button>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-grid">
                      <button className="btn btn-outline-secondary">
                        Mark all as read
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="dropdown pc-h-item header-user-profile">
            <a
              className="pc-head-link dropdown-toggle arrow-none me-0"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="false"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              <img
                src="/assets/images/user/avatar-2.jpg"
                alt="user-image"
                className="user-avtar"
              />
            </a>
            <div className="dropdown-menu dropdown-user-profile dropdown-menu-end pc-h-dropdown">
              <div className="dropdown-header d-flex align-items-center justify-content-between">
                <h5 className="m-0">Profile</h5>
              </div>
              <div className="dropdown-body">
                <div
                  className="profile-notification-scroll position-relative"
                  style={{ maxHeight: "calc(100vh - 225px)" }}
                >
                  <ul className="list-group list-group-flush w-100">
                    <li className="list-group-item">
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <img
                            src="/assets/images/user/avatar-2.jpg"
                            alt="user-image"
                            className="wid-50 rounded-circle"
                          />
                        </div>
                        <div className="flex-grow-1 mx-3">
                          <h5 className="mb-0">Carson Darrin</h5>
                          <a
                            className="link-primary"
                            href="mailto:carson.darrin@company.io"
                          >
                            carson.darrin@company.io
                          </a>
                        </div>
                        <span className="badge bg-primary">PRO</span>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <a href="#" className="dropdown-item">
                        <span className="d-flex align-items-center">
                          <i className="ph-duotone ph-key" />
                          <span>Change password</span>
                        </span>
                      </a>
                      <a href="#" className="dropdown-item">
                        <span className="d-flex align-items-center">
                          <i className="ph-duotone ph-envelope-simple" />
                          <span>Recently mail</span>
                        </span>
                        <div className="user-group">
                          <img
                            src="/assets/images/user/avatar-1.jpg"
                            alt="user-image"
                            className="avtar"
                          />
                          <img
                            src="/assets/images/user/avatar-2.jpg"
                            alt="user-image"
                            className="avtar"
                          />
                          <img
                            src="/assets/images/user/avatar-3.jpg"
                            alt="user-image"
                            className="avtar"
                          />
                        </div>
                      </a>
                      <a href="#" className="dropdown-item">
                        <span className="d-flex align-items-center">
                          <i className="ph-duotone ph-calendar-blank" />
                          <span>Schedule meetings</span>
                        </span>
                      </a>
                    </li>
                    <li className="list-group-item">
                      <a href="#" className="dropdown-item">
                        <span className="d-flex align-items-center">
                          <i className="ph-duotone ph-heart" />
                          <span>Favorite</span>
                        </span>
                      </a>
                      <a href="#" className="dropdown-item">
                        <span className="d-flex align-items-center">
                          <i className="ph-duotone ph-arrow-circle-down" />
                          <span>Download</span>
                        </span>
                        <span className="avtar avtar-xs rounded-circle bg-danger text-white">
                          10
                        </span>
                      </a>
                    </li>
                    <li className="list-group-item">
                      <div className="dropdown-item">
                        <span className="d-flex align-items-center">
                          <i className="ph-duotone ph-globe-hemisphere-west" />
                          <span>Languages</span>
                        </span>
                        <span className="flex-shrink-0">
                          <select className="form-select bg-transparent form-select-sm border-0 shadow-none">
                            <option value={1}>English</option>
                            <option value={2}>Spain</option>
                            <option value={3}>Arbic</option>
                          </select>
                        </span>
                      </div>
                      <a href="#" className="dropdown-item">
                        <span className="d-flex align-items-center">
                          <i className="ph-duotone ph-flag" />
                          <span>Country</span>
                        </span>
                      </a>
                      <div className="dropdown-item">
                        <span className="d-flex align-items-center">
                          <i className="ph-duotone ph-moon" />
                          <span>Dark mode</span>
                        </span>
                        <div className="form-check form-switch form-check-reverse m-0">
                          <input
                            className="form-check-input f-18"
                            id="dark-mode"
                            type="checkbox"
                            onclick="dark_mode()"
                            role="switch"
                          />
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <a href="#" className="dropdown-item">
                        <span className="d-flex align-items-center">
                          <i className="ph-duotone ph-user-circle" />
                          <span>Edit profile</span>
                        </span>
                      </a>
                      <a href="#" className="dropdown-item">
                        <span className="d-flex align-items-center">
                          <i className="ph-duotone ph-star text-warning" />
                          <span>Upgrade account</span>
                          <span className="badge bg-light-success border border-success ms-2">
                            NEW
                          </span>
                        </span>
                      </a>
                      <a href="#" className="dropdown-item">
                        <span className="d-flex align-items-center">
                          <i className="ph-duotone ph-bell" />
                          <span>Notifications</span>
                        </span>
                      </a>
                      <a href="#" className="dropdown-item">
                        <span className="d-flex align-items-center">
                          <i className="ph-duotone ph-gear-six" />
                          <span>Settings</span>
                        </span>
                      </a>
                    </li>
                    <li className="list-group-item">
                      <a href="#" className="dropdown-item">
                        <span className="d-flex align-items-center">
                          <i className="ph-duotone ph-plus-circle" />
                          <span>Add account</span>
                        </span>
                      </a>
                      <a href="#" className="dropdown-item">
                        <span className="d-flex align-items-center">
                          <i className="ph-duotone ph-power" />
                          <span>Logout</span>
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </header>
  {/* [ Header ] end */}
</>

  )
}

export default Header