import React, { useEffect, useState } from 'react';
import Header from '../../shared/Header/Header';
import { useSelector } from 'react-redux';

const DataList = () => {
  const [onlyFileData, setOnlyFileData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dataPerView, setDataPerView] = useState(50);
  const [paginationLength, setPaginationLength] = useState([1]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [changeFileOnName, setChangeFileOnName] = useState("");
  const [changeFileOnBank, setChangeFileOnBank] = useState("");
  const [changeFileOnDate, setChangeFileOnDate] = useState("");
  const RawFileData = useSelector(state => state.AdminDataSlice?.file);
  const bankData = useSelector(state => state.AdminDataSlice?.bank);
  const [breakDownFIleData, setBreakDownFIleData] = useState([]);

  // Extract file names
  const breakDownFIleName = RawFileData?.map(({ name }) => name);

  // Fetch and group dates
  const getAllDates = RawFileData?.map(value => value?.uploaddate);
  function groupByMonthYear(dates) {
    const grouped = {};
    dates?.forEach(dateString => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = date.toLocaleString('default', { month: 'long' });
      const key = `${month} ${year}`;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(dateString);
    });
    return grouped;
  }
  const groupedDates = groupByMonthYear(getAllDates);

  // Update breakDownFIleData based on filters
  useEffect(() => {
    let filteredData = RawFileData;

    if (changeFileOnName && changeFileOnName !== 'Select List') {
      filteredData = filteredData.filter(value => value?.name === changeFileOnName);
    }

    if (changeFileOnBank && changeFileOnBank !== 'Select Bank') {
      filteredData = filteredData.filter(value => value?.bank_name === changeFileOnBank);
    }

    if (changeFileOnDate !== '' && changeFileOnDate !== 'Select Month Year') {
      const [selectedMonth, selectedYear] = changeFileOnDate.split(" ");
      filteredData = filteredData.filter(value => {
        const date = new Date(value.uploaddate);
        return (
          date.getFullYear() === parseInt(selectedYear) &&
          date.toLocaleString('default', { month: 'long' }) === selectedMonth
        );
      });
    }

    const data = filteredData.map(({ data }) => data).flat();
    setBreakDownFIleData(data);
  }, [RawFileData, changeFileOnName, changeFileOnBank, changeFileOnDate]);

  // Search function to filter results based on a query
  const findMember = (query) => {
    if (query) {
      const lowercasedQuery = query.toUpperCase();
      setOnlyFileData(
        breakDownFIleData.filter(value =>
          typeof value.REGDNUM === 'string' && value.REGDNUM.toUpperCase().includes(lowercasedQuery)
        )
      );
    } else {
      setOnlyFileData(breakDownFIleData);
    }
  };

  // Handle search input changes
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    findMember(query);
  };

  // Handle pagination logic
  useEffect(() => {
    if (dataPerView > 0 && breakDownFIleData.length > 0) {
      const startIndex = (currentIndex - 1) * dataPerView;
      const endIndex = currentIndex * dataPerView;
      setOnlyFileData(breakDownFIleData.slice(startIndex, endIndex));

      const length = Math.ceil(breakDownFIleData.length / dataPerView);
      setPaginationLength(Array.from({ length }, (_, i) => i + 1));
    } else {
      setOnlyFileData(breakDownFIleData);
      setPaginationLength([1]);
    }
  }, [dataPerView, breakDownFIleData, currentIndex]);

  return (
    <>
      <Header />
      {/* <button onClick={() => console.log(groupedDates)}>Show Dates</button> */}
      <div className="container-fluid my-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h3>Data List</h3>
              </div>
              <div className="card-body">
                <div className="dt-responsive table-responsive">
                  <div id="table-style-hover_wrapper" className="dt-container dt-bootstrap5">
                    <div className="row mt-2 gap-15 justify-content-evenly my-3">
                      <div className="col-md-3 me-auto">
                        <select
                          name="table-style-hover_length"
                          aria-controls="table-style-hover"
                          className="form-select form-control form-select-sm"
                          id="dt-length-3"
                          onChange={(event) => setChangeFileOnBank(event.target.value)}
                        >
                          <option>Select Bank</option>
                          {bankData?.map(value => (
                            <option key={value?._id} value={value?.bank}>{value?.bank}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-3 me-auto">
                        <select
                          name="table-style-hover_length"
                          aria-controls="table-style-hover"
                          className="form-select form-control form-select-sm"
                          id="dt-length-3"
                          onChange={(event) => setChangeFileOnDate(event.target.value)}
                        >
                          <option>Select Month Year</option>
                          {Object.keys(groupedDates).map((key) => (
                            <option key={key} value={key}>{key}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-3 me-auto">
                        <select
                          name="table-style-hover_length"
                          aria-controls="table-style-hover"
                          className="form-select form-control form-select-sm"
                          id="dt-length-3"
                          onChange={(event) => setChangeFileOnName(event.target.value)}
                        >
                          <option>Select List</option>
                          {breakDownFIleName?.map(value => (
                            <option key={value} value={value}>{value}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="row mt-2 justify-content-between">
                      <div className="col-md-auto me-auto">
                        <div className="dt-length">
                          <select
                            name="table-style-hover_length"
                            aria-controls="table-style-hover"
                            className="form-select form-select-sm"
                            id="dt-length-3"
                            onChange={(event) => setDataPerView(Number(event.target.value))}
                            value={dataPerView}
                          >
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                            <option value={200}>200</option>
                            <option value={500}>500</option>
                          </select>
                          <label htmlFor="dt-length-3"> entries per page</label>
                        </div>
                      </div>
                      <div className="col-md-auto ms-auto">
                        <div className="dt-search">
                          <label htmlFor="dt-search-3">Search:</label>
                          <input
                            type="search"
                            className="form-control form-control-sm"
                            id="dt-search-3"
                            placeholder=""
                            aria-controls="table-style-hover"
                            value={searchQuery}
                            onChange={handleSearchChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mt-2 justify-content-md-center">
                      <div className="col-12">
                        <table
                          id="table-style-hover"
                          className="table table-striped my-3 table-hover table-bordered nowrap dataTable"
                          aria-describedby="table-style-hover_info"
                        >
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Agreement No</th>
                              <th>Customer Name</th>
                              <th>Branch</th>
                              <th>Reg No</th>
                              <th>Chassis No</th>
                              <th>Engine No</th>
                              <th>Manufacturer Des</th>
                              <th>Make</th>
                              <th>Model No</th>
                              <th>Assets Des</th>
                              <th>Arm Name</th>
                              <th>Arm Phone</th>
                            </tr>
                          </thead>
                          <tbody>
                            {onlyFileData?.map((value, index) => {
                              const ARMPHONE = value?.ARMNAME?.match(/\d+/g).join('');
                              const ARMNAME = value?.ARMNAME?.slice(0, -11)
                              return (
                                <tr key={index}>
                                  <td className="sorting_1">{index + 1}</td>
                                  <td className="sorting_1">{value.AGREEMENTNO}</td>
                                  <td className="sorting_1">{value.CUSTOMERNAME}</td>
                                  <td className="sorting_1">{value.BRANCH}</td>
                                  <td className="sorting_1">{value.REGDNUM}</td>
                                  <td className="sorting_1">{value.CHASISNUM}</td>
                                  <td className="sorting_1">{value.ENGINENUM}</td>
                                  <td className="sorting_1">{value.MANUFACTURERDESC}</td>
                                  <td className="sorting_1">{value.MAKE}</td>
                                  <td className="sorting_1">{value.MODELNUM}</td>
                                  <td className="sorting_1">{value.ASSETSDESC}</td>
                                  <td className="sorting_1">{ARMNAME}</td>
                                  <td className="sorting_1">{ARMPHONE}</td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="row mt-2 justify-content-between">
                      <div className="col-md-auto me-auto">
                        <div
                          className="dt-info"
                          aria-live="polite"
                          id="table-style-hover_info"
                          role="status"
                        >
                          {`showing 1 to ${onlyFileData.length} of ${breakDownFIleData.flat().length} entries`}
                        </div>
                      </div>
                      <div className="col-md-auto ms-auto">
                        <div className="dt-paging paging_full_numbers">
                          <ul className="pagination">
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
                            {paginationLength?.map((value, index) => (
                              <li key={index} className="dt-paging-button page-item">
                                <button
                                  className={`page-link ${currentIndex === value ? 'active' : ''}`}
                                  aria-controls="table-style-hover"
                                  aria-current="page"
                                  data-dt-idx={0}
                                  tabIndex={0}
                                  onClick={() => setCurrentIndex(value)}
                                >
                                  {index + 1}
                                </button>
                              </li>
                            ))}
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
    </>
  );
}

export default DataList;
