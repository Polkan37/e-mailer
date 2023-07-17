import React from 'react'
import { Route, Routes } from "react-router-dom";
import Sidebar from '../../components/Sidebar/Sidebar'
import Box from '@mui/material/Box';
import { Melissa } from '../Melissa/Melissa';
import { Lica } from '../Lica/Lica';
import { Upload } from '../TemplateUpload/Upload';
import { Templates } from '../Templates/Templates';
import { Constants } from '../Constants/Constants';
import { DrawerHeader } from '../../components/Sidebar/setSidebarStyles'
import { WelcomeBlock } from './WelcomeBlock';
import TemplatePage from '../Templates/TemplatePage';
import { Logout } from '../Login/Logout';


export default function Home({ licaToken, melissaToken }) {


    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <Routes>
                        <Route exact path="*" element={<WelcomeBlock />} />
                        <Route path="melissa" element={<Melissa melissaToken={melissaToken} />} />
                        <Route path="lica" element={<Lica licaToken={licaToken} />} />
                        <Route path="upload" element={<Upload melissaToken={melissaToken} licaToken={licaToken} />} />
                        <Route path="templates" element={<Templates />} />
                        <Route path="constants" element={<Constants />} />
                        <Route path="logout" element={<Logout />} />


                        <Route path="/templates/:templateName" element={<TemplatePage />} />
                    </Routes>
                </Box>
            </Box>
        </>
    )
}
