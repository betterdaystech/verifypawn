import * as React from 'react';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {Box, TextField, Button, Paper} from '@mui/material';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.vite";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
function App() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  React.useEffect(() => {
    
  },[])
  return (
    <div className="App">
      <Document file={{ url: 'https://www.africau.edu/images/default/sample.pdf', httpHeaders: { 'X-CustomHeader': '40359820958024350238508234' }, withCredentials: false }} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  )
}

export default App
