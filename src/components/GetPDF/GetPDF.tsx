import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

import FileDiffBlock from '../FileDiffBlock/FileDiffBlock';
import { DifferencesData } from '../../interfaces/interfaces';
import "./GetPDF.css"

const GetPDF: React.FC = () => {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [differences, setDifferences] = useState<DifferencesData | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file1 || !file2) {
      alert('Both files are required');
      return;
    }
    const formData = new FormData();
    formData.append('pdfFiles', file1);
    formData.append('pdfFiles', file2);

    try {
      const response = await axios.post('https://pdf-comparer-api.onrender.com/compare', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setDifferences(response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const handleFileChange = (setter: React.Dispatch<React.SetStateAction<File | null>>) => 
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.[0]) {
        setter(event.target.files[0]);
      }
  };

  // console.log("diff", differences)
  return (
    <div>
      <h1 className="p-2">PDF Compare.</h1>
      <small className="text-secondary p-2">Compare required PDFs and find out differences quickly!</small>
      <form className="d-flex container card mt-4" onSubmit={handleSubmit}>
        <input type="file" className="form-control m-2" onChange={handleFileChange(setFile1)} />
        <input type="file" className="form-control m-2" onChange={handleFileChange(setFile2)} />
        <button type="submit" disabled={file1 && file2 ? false : true} className="form-control m-2 submit-btn btn btn-primary">Compare PDFs</button>
      </form>
      {
        differences?.different === false ?
        <p className="mt-2 fs-4">Files are identical</p>
        :
        !differences || !differences.differences ?
         <div className="mt-4 p-3">
            <h3>How it works:</h3>
            <div>
              <p>Upload two files. Make sure the format of the files is  <strong> PDF </strong></p>
              <p>Press the button!</p>
            </div>
            <p>This application will compare both the files you have submitted and output differences found in the file</p>
            <small className="text-danger p-3"> Make sure that you upload both files otherwise the button will not be activated! </small>
         </div>
        :     
        <div className='p-2'>
          <p className="mt-2 fs-4">Files are different</p>
          <small className="mt-2">Differences:</small>
          <div className="d-flex diff-container">
            <FileDiffBlock differences={differences.differences.filter(item => item.status === "Removed")} different={differences.different}  />
            <FileDiffBlock differences={differences.differences.filter(item => item.status === "Added")} different={differences.different}  />
          </div>
        </div>  
      }
    </div>
  );
};

export default GetPDF;
