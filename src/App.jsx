import * as React from 'react';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {Box, TextField, Button, Paper} from '@mui/material';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
function App() {
  // Array of contract devices
  const contractDevicesData = [
    {"contract_id": "123456","customer_name": "John Smith","customer_email": "john.smith@example.com","device_make": "Apple",    "device_model": "iPhone 12",    "imei_number": "123456789012345",    "contract_start_date": "2022-01-01",    "contract_end_date": "2023-01-01"  },
    {"contract_id": "234567","customer_name": "Jane Doe",    "customer_email": "jane.doe@example.com",    "device_make": "Samsung",    "device_model": "Galaxy S21",    "imei_number": "234567890123456",    "contract_start_date": "2022-02-01",    "contract_end_date": "2023-02-01"  },  
    {"contract_id": "345678","customer_name": "Bob Johnson",    "customer_email": "bob.johnson@example.com",    "device_make": "Google",    "device_model": "Pixel 6",    "imei_number": "345678901234567",    "contract_start_date": "2022-03-01",    "contract_end_date": "2023-03-01"  }
  ];
  // Array of stolen goods, with some IMEI numbers from the contract devices
  const stolenGoodsData = [
    {"item_id": "789012",    "item_name": "Apple Watch Series 7",    "item_description": "Gold Aluminum Case with Starlight Sport Band",    "imei_number": "1234567890",    "date_reported_stolen": "2023-03-01",    "location_stolen": "New York City, NY"  },  
    {"item_id": "890123",    "item_name": "Samsung Galaxy Tab S7+",    "item_description": "128GB, Mystic Black",    "imei_number": "2345678901",    "date_reported_stolen": "2023-03-02",    "location_stolen": "Los Angeles, CA"  },  
    {"item_id": "901234",    "item_name": "Google Pixel Buds Pro",    "item_description": "White",    "imei_number": "3456789012",    "date_reported_stolen": "2023-03-03",    "location_stolen": "Chicago, IL"  },  
    {"item_id": "012345",    "item_name": "Apple MacBook Pro",    "item_description": "16-inch, Space Gray",    "imei_number": "123456789012345",    "date_reported_stolen": "2023-03-04",    "location_stolen": "Houston, TX"}
  ];

  const [serialNumber, setSerialNumber] = useState('');
  const [contractMatch, setContractMatch] = useState(null);
  const [stolenMatch, setStolenMatch] = useState(null);
  const [results,setResults] = useState(null);
  const handleInputChange = (event) => {
    setSerialNumber(event.target.value);
  };
  const handleVerifyClick = async () => {
    let foundInContracts = false;
    let foundInStolen = false;
    // Check if the serial number is in the contracts data
    for (const item of contractDevicesData) {
      if (item.imei_number === serialNumber) {
        setContractMatch(item);
        foundInContracts = true;
        break;
      }
    }

    // If not found in contracts, check if it's in the stolen goods data
    for (const item of stolenGoodsData) {
      if (item.imei_number === serialNumber) {
        setStolenMatch(item);
        foundInStolen = true;
        break;
      }
    }

    // If the serial number is not found in either list, show a message
    if (!foundInContracts && !foundInStolen) {
      showResults("Serial number not found in contracts or stolen goods list.",true);
    }
    if(foundInContracts && !foundInStolen){
      showResults("Device is on contract",false)
    }
    if(!foundInContracts && foundInStolen){
      showResults("Device is on stolen database",false)
    }
    if(foundInContracts && foundInStolen){
      showResults("Device is on contract and reported as stolen too",false)
    }
  };
  const showResults = (message,status) => {
    setResults({message,status})
  }
  return (
    <div className="App">
      <Paper elevation={30} style={{padding:10,paddingLeft:50,paddingRight:50}}>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField 
            id="outlined-basic" 
            label="Enter Serial Number or IMEI"
            variant="outlined"
            fullWidth
            margin="normal"
            value={serialNumber}
            onChange={handleInputChange} 
            onFocus={() => setResults(null)}
          />
        </Box>
        <Box>
          <Button variant="contained" color="primary" onClick={handleVerifyClick}>
            Verify
          </Button>
        </Box>
      </Paper>
      {results &&
        <Paper style={{paddingLeft:50,paddingRight:50,marginTop:30}}>
          <Box>
            {results?.status && <CheckCircleOutlinedIcon style={{fill: "green",fontSize:30}} />}
            {!results?.status && <CancelIcon style={{fill: "tomato",fontSize:30}} />}
            <div>{results.message}</div>
          </Box>
        </Paper>
      }
    </div>
  )
}

export default App
