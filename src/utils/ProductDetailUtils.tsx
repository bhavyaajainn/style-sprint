import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableComponents } from 'react-virtuoso';

  
  export const VirtuosoTableComponents: TableComponents<{Data:any}, unknown> = {
    Scroller: React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props: React.ComponentProps<typeof Table>) => (
      <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed', backgroundColor: '#AC8968', color: 'white' }} />
    ),
    TableHead: React.forwardRef<HTMLTableSectionElement, React.ComponentProps<typeof TableHead>>((props, ref) => (
      <TableHead {...props} ref={ref} />
    )),
    TableRow: (props: React.ComponentProps<typeof TableRow>) => <TableRow {...props} />,
    TableBody: React.forwardRef<HTMLTableSectionElement, React.ComponentProps<typeof TableBody>>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };
  
  export const fixedHeaderContent=(columns:any)=> {
    return (
      <TableRow>
        {columns.map((column:any) => (
          <TableCell
            key={column}
            variant="head"
            align={column.numeric ? 'right' : 'left'}
            style={{ width: column.width }}
            sx={{
              backgroundColor: '#3E362E',
              color: 'white',
              fontSize: "1.2em"
            }}
          >
            {column}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  export const rowContent = (row: any, columns:any)=> {
    return (
      <React.Fragment>
        {columns.map((column:any) => (
          <TableCell
            key={column}
            align={column.numeric ? 'right' : 'left'}
            sx={{ color: 'white', fontSize: "1.2em" }}
          >
            {row[column]}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }
