import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import FormLabel from "@mui/material/FormLabel";
import CachedIcon from "@mui/icons-material/Cached";
import CircularProgress from "@mui/material/CircularProgress";

import TemplatePreview from "./TemplatePreview";
import { refreshPage } from "../../utils/refreshPage";
import checkParamIsTheSame from "./checkParamIsTheSame";
import getMelissaRequest from './getMelissaRequest';
import getLicaRequest from "./getLicaRequest";

// Allowed extensions for input file
const allowedExtensions = ["csv"];

function UpdateForm({
  melissaToken,
  licaToken,
  setLoadButtonIsDisabled,
  setTemplates
}) {
  const [file, setFile] = useState("");
  const [dataFromFile, setDataFromFile] = useState(null);
  const [templatePrep, setTemplatePrep] = useState([])
  const [ShowRefreshButton, setShowRefreshButton] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null)

  useEffect( () => {
    if(error) setLoadButtonIsDisabled(true)
  }, [error])

  useEffect( () => {
    if(templatePrep.length ) {
      console.log('templatePrep: ', templatePrep);
      Promise.all(
        templatePrep.map(async temp => {
          const { crm, templateId, language, subject, templateHTML } = temp;
          let request;
          
          switch (crm) {
            case "melissa": {
              request = getMelissaRequest(language, subject, templateHTML)
              
              break;
            }
            case "lica": {
              request = await getLicaRequest(templateId, language, subject, templateHTML, licaToken, setError)
                
              console.log('request: ', request);
              
              break;
            }
            default:
              break;
          }
          return {...temp, request: request}
        })
        ).then( res => {
          setTemplates(res);

        }
      )

    }
  }, [templatePrep])


  
  const handleFileChange = (e) => {
    if (e.target.files.length) {
      const inputFile = e.target.files[0];
      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        setError("Plaease, select .csv file");
        return;
      }
      setFile(inputFile);
    }
  };

  const handleParse = () => {
    setIsLoading(<CircularProgress />)
    if (!file) return setError("Enter a valid file");

    const reader = new FileReader();

    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = await csv?.data;

      if (!parsedData.length) {
        return;
      }

      if (checkParamIsTheSame("crm", parsedData)) {
        setDataFromFile(parsedData);
        setInputDisabled(true);
        setShowRefreshButton(true);
        setIsLoading(null)
        if(!error) {
          setLoadButtonIsDisabled(false)
          
        }
        return;
      }
      setError("In one file use templates for only one, the same crm, pls.");
      setShowRefreshButton(true);
    };
    reader.readAsText(file);
  };

  return (
    <Box sx={{ display: "block", flexWrap: "wrap" }}>
      <FormLabel component="legend">
        {ShowRefreshButton ? (
          <Button
            variant="outlined"
            startIcon={<CachedIcon />}
            onClick={refreshPage}
          >
            refresh
          </Button>
        ) : (
          "Choose .csv File"
        )}
      </FormLabel>
      <Input
        type="File"
        accept="text/csv"
        id="csvInput"
        name="file"
        onChange={handleFileChange}
        disabled={inputDisabled}
      />

      <Button
        variant="contained"
        sx={{ display: "block", m: 2 }}
        onClick={handleParse}
        disabled={inputDisabled}
      >
        Parse
      </Button>

      {error ? (
        <div
          style={{
            margin: "1rem",
            color: "#ed5454",
            fontWeight: "500",
            fontSize: "20px",
          }}
          id="error"
        >
          {error}
        </div>
      ) : (
        ""
      )}

      <div style={{ marginTop: "2rem" }} id="content">
        {dataFromFile ? (
          <TemplatePreview
            dataFromFile={dataFromFile}
            melissaToken={melissaToken}
            licaToken={licaToken}
            setCrmConnectError={setError}
            setTemplatePrep={setTemplatePrep}
          />
        ) : (
          isLoading ? isLoading : ''
        )}
      </div>
    </Box>
  );
}

export default UpdateForm;
