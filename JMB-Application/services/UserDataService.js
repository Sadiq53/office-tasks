const handleGetData = async() =>{
    const response = await fetch('https://jmb-server.onrender.com/admin/data', {
        method: "GET"
    });
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    let filteredData = data?.fileData;
    const files = filteredData.map(({ data }) => data).flat();
    return files;
}

export {handleGetData}