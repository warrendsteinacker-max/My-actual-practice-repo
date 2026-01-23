import React from 'react'

const comp1 = () => {
    function MernUploader() {
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('myFile', file);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("File uploaded to your MERN server!");
    } catch (err) {
      console.error(err);
    }
  };

  return (<input type="file" onChange={handleFileUpload} />;
}
  


export default comp1