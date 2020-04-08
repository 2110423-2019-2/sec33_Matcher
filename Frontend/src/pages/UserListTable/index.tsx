import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Button } from "../../components";
import { getUserList, blackList } from '../../api/admin';


export default () => {
  
  interface Column {
  id: 'name' | 'email' | 'role' | 'blacklist' | 'report';
  label: string;
  }

  interface Data {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  blacklist: boolean;
  }

  const columns: Column[] = [
    { id: 'name', label: 'Name'},
    { id: 'email', label: 'Email'},
    { id: 'role',  label: 'Role'},
    { id: 'blacklist', label: 'Blacklist'},
    { id: 'report', label: 'Report'},
  ];  

  const fillData = (data : Data) => {
    if(data.blacklist){
      return {'name':data.firstname+' '+data.lastname, 'email':data.email, 'role':data.role, 'blacklist':<Button
      onClick={() => handleBlacklist(data._id)}
    >Undo
    </Button>,
    'report':<Button 
    // onClick={handleClickOpen}
    >View</Button>}
    }
    return {'name':data.firstname+' '+data.lastname, 'email':data.email, 'role':data.role, 'blacklist':<Button
    onClick={() => handleBlacklist(data._id)}
  >Blacklist
  </Button>,
  'report':<Button
  // onClick={handleClickOpen}
  >View</Button>
  }}; 

  const [userList, setUserList] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const setUser = () => {
    getUserList().then(userLists => setUserList(userLists));
  };

  useEffect(() => {setUser()}, [])

  const rows = userList.map(user => fillData(user));
  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleBlacklist = (id : string) => {
    blackList(id)
    .then(() => {
      setUser();
  })
  }

  return (

    <div>
      <TableContainer className="root">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align='center' 
                  style={{ minWidth: 170 }}
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
                      align='center' 
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