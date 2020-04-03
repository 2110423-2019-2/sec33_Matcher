import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Button } from "../../components";

interface Column {
  id: 'name' | 'email' | 'role' | 'button';
  label: string;
}

const columns: Column[] = [
  { id: 'name', label: 'Name'},
  { id: 'email', label: 'Email'},
  { id: 'role',  label: 'Role'},
  { id: 'button', label: 'Blacklist'},
];

interface Data {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  blacklist: boolean;
}

function handleClick(id : string){
  console.log(id);
  //call api
}

function fillData(data : Data){
  if(data.blacklist){
    return {'name':data.firstname+' '+data.lastname, 'email':data.email, 'role':data.role, 'button':<Button
    onClick={() => handleClick(data._id)}
  >Undo
  </Button>}
  }
  return {'name':data.firstname+' '+data.lastname, 'email':data.email, 'role':data.role, 'button':<Button
  onClick={() => handleClick(data._id)}
>Blacklist
</Button>
}
};


//-----------------------------------
//from api
const data1: Data = {
  _id: 'id1',
  firstname: 'not in Blacklist',
  lastname: 'last',
  email: 'email@email.com',
  role: 'tester',
  blacklist: false,
}
const data2: Data = {
  _id: 'id2',
  firstname: 'in Blacklist',
  lastname: 'name',
  email: 'email_asdasd@email.com',
  role: 'tester',
  blacklist: true,
}

const arr = [data1, data2]; //get from api
//-----------------------------------

const rows = new Array();
for (var data in arr){
  rows.push(fillData(arr[data]));
}

export default () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.email}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} 
                      >
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}