
import PanoramaHorizontalSelectIcon from '@mui/icons-material/PanoramaHorizontalSelect';
import PanoramaHorizontalIcon from '@mui/icons-material/PanoramaHorizontal';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import InventoryIcon from '@mui/icons-material/Inventory';
import TranslateIcon from '@mui/icons-material/Translate';


export const PAGES = [
    {
        key: 'lica-preview',
        url: '/lica',
        icon: <PanoramaHorizontalSelectIcon />,
        titleText: 'Lica templates'
    },
    {
        key: 'melissa-preview',
        url: '/melissa',
        icon: <PanoramaHorizontalIcon />,
        titleText: 'Melissa templates'
    },
    {
        key: 'update',
        url: '/upload',
        icon: <SystemUpdateAltIcon />,
        titleText: 'Update from File'
    },
    {
        key: 'templates',
        url: '/templates',
        icon: <InventoryIcon />,
        titleText: 'Templates'
    },
    {
        key: 'constants',
        url: '/constants',
        icon: <TranslateIcon />,
        titleText: 'Constants'
    },
]