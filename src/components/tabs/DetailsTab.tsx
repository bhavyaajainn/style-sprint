import React, { useState } from 'react';
import { Tabs, Tab, Box, useMediaQuery, Theme } from '@mui/material';
import ReactProductDetailsTable from '../table/DetailTable';
import { getProductRows, rowValuesName } from '../../pages/product-detail/product-details-helper/ProductTableData';
import { fixedHeaderContent, VirtuosoTableComponents } from '../../utils/ProductDetailUtils';
import { getProductHeaderContent } from '../../pages/product-detail/product-details-helper/ProductTableData';
import { getMaterialRows, materialRowValuesName, getMaterialHeaderContent } from '../../pages/product-detail/product-details-helper/MaterialTableData';
import { getSizeRows, getSizeHeaderContent } from '../../pages/product-detail/product-details-helper/SizeTableData';

export const DetailsTab = (props: any) => {
    const [value, setValue] = useState(0);
    const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery((theme: Theme) => theme.breakpoints.between('sm', 'md'));

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const productDetailsprop = {
        rows: getProductRows(props.details),
        rowValues: rowValuesName,
        columns: getProductHeaderContent,
    };

    const materialDetailsprop = {
        rows: getMaterialRows(props.details),
        rowValues: materialRowValuesName,
        columns: getMaterialHeaderContent,
    }

    const sizeHeaderContent = getSizeHeaderContent(props.details);
    const sizeDetailsprop = {
      rows: getSizeRows(props.details),
      rowValues: sizeHeaderContent,
      columns: sizeHeaderContent,
  }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    orientation={isSmallScreen ? 'vertical' : 'horizontal'}
                    variant={isSmallScreen || isMediumScreen ? 'scrollable' : 'standard'}
                    scrollButtons={isSmallScreen || isMediumScreen ? true : undefined} // Enable scroll buttons for small and medium screens
                >
                    <Tab label="Product Details" sx={{ fontSize: isSmallScreen ? "1em" : isMediumScreen ? "1.2em" : "1.5em", margin: isSmallScreen ? "0.5em" : "1em" }} />
                    <Tab label="Material & Care" sx={{ fontSize: isSmallScreen ? "1em" : isMediumScreen ? "1.2em" : "1.5em", margin: isSmallScreen ? "0.5em" : "1em" }} />
                    <Tab label="Size Guide" sx={{ fontSize: isSmallScreen ? "1em" : isMediumScreen ? "1.2em" : "1.5em", margin: isSmallScreen ? "0.5em" : "1em" }} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                {ReactProductDetailsTable(productDetailsprop)}
            </TabPanel>
            <TabPanel value={value} index={1}>
            {ReactProductDetailsTable(materialDetailsprop)}
            </TabPanel>
            <TabPanel value={value} index={2}>
            {ReactProductDetailsTable(sizeDetailsprop)}
            </TabPanel>
        </Box>
    );
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}
