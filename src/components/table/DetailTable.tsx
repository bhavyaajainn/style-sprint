import Paper from '@mui/material/Paper';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import { useTheme } from '@mui/material';
import { fixedHeaderContent, rowContent, VirtuosoTableComponents } from '../../utils/ProductDetailUtils';

export default function ReactProductDetailsTable(props:any) {
 
  const theme = useTheme();
  return (
    <Paper style={{ height: 400, width: '100%' }}>
      <TableVirtuoso
        data={props.rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={()=>fixedHeaderContent(props.columns)}
        itemContent={(index)=> rowContent(props.rows[index], props.rowValues) || []}
        style={{ backgroundColor: theme.palette.primary.main }}
      />
    </Paper>
  );
}
