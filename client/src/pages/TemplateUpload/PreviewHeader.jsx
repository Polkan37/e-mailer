import React from 'react'
import Typography from "@mui/material/Typography";

import licaIcon from '../../assets/lica-favicon.png'
import melissaIcon from '../../assets/melissa-favicon.ico'

function PreviewHeader({crm, templateId, templateTitleInCrm, templateName, isNews }) {
    const logo = crm === 'melissa' ?  melissaIcon : crm === 'lica' ?  licaIcon : false

  return (
    <Typography
      variant="h6"
      align="center"
      sx={{
        mt: 2,
        bgcolor: "#dcedff",
        border: "15px solid #d0e7fe",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
      }}
    >
      { logo ? <img src={logo} alt="" width="20"/> : ''} <b>Template {templateId}:&nbsp;</b>
      {templateTitleInCrm}
      <div>
        <b>HTML template:</b> {templateName}
        <b>{ isNews ? "+ News" : ""}</b>
      </div>
    </Typography>
  )
}

export default PreviewHeader