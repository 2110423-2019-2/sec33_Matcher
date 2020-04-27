import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Button } from "../../components";
import { getUserList, blackList, getReport } from '../../api/admin';

import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Moment from 'moment';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


export default () => {
  
  interface Column {
  id: 'name' | 'email' | 'role' | 'recentReport' | 'blacklist' | 'report';
  label: string;
  }

  interface ReportColum{
    id:'reportee' | 'createTime' | 'reason';
    label: string;
  }

  interface Data {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  report: Report[];
  recent: string;
  blacklist: boolean;
  }

  interface Report {
    _id: string;
    reporter: string;
    reportee: string;
    reason: string;
    createTime: string;
  }

  const columns: Column[] = [
    { id: 'name', label: 'Name'},
    { id: 'email', label: 'Email'},
    { id: 'role',  label: 'Role'},
    { id: 'blacklist', label: 'Blacklist'},
    { id: 'report', label: 'Report'},
    { id: 'recentReport', label: 'Recent Report'},
  ];  

  const reportColumns: ReportColum[] = [
    { id: 'reportee', label: 'Reportee'},
    { id: 'createTime',  label: 'Create Date'},
    { id: 'reason', label: 'Reason'},
  ]; 

  const fillData = (data : Data, reports : Report[]) => {
    let recent = '-'
    if(data.recent != '-'){
      recent = Moment(data.recent).format('D MMM YYYY hh:mm A')
    }
    if(data.blacklist){
      return {'name':data.firstname+' '+data.lastname, 'email':data.email, 'role':data.role,'recentReport':recent, 'blacklist':<Button
      onClick={() => handleBlacklist(data._id)}
    >Undo
    </Button>,
    'report':<Button 
      onClick={() => handleReport(data._id)}
    >View</Button>}
    }
    return {'name':data.firstname+' '+data.lastname, 'email':data.email, 'role':data.role,'recentReport':recent, 'blacklist':<Button
    onClick={() => handleBlacklist(data._id)}
  >Blacklist
  </Button>,
  'report':<Button
    onClick={() => handleReport(data._id)}
  >View</Button>
  }}; 

  const fillReport = (data : Report) => {
    const reportee = userList.filter((user: Data) => user._id === data.reportee)[0];
    if(reportee){
      return {'reportee':(reportee as Data).firstname+' '+(reportee as Data).lastname, 'createTime':Moment(data.createTime).format('D MMM YYYY hh:mm A'), 'reason':data.reason}
    }
    return {'reportee':'', 'createTime':'', 'reason':''}
  }

  const [userList, setUserList] = React.useState([] as Data[]);
  const [reportsList, setReportsList] = React.useState([] as Report[]);  
  const [allReportsLists, setAllReportsLists] = React.useState([] as Report[]);   
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);

  const setUser = () => {
    getUserList().then((userLists:Data[]) => {
      getReport().then((reportsLists:Report[]) =>{
        for(var i=0;i<userLists.length;i++){
          userLists[i]['report'] = new Array();
          for(var j=0;j<reportsLists.length;j++){
            if(userLists[i]._id == reportsLists[j].reporter){
              userLists[i]['report'].push(reportsLists[j])
            }
          }
          let recentReport;
          if(userLists[i]['report'].length > 0){
            recentReport = Moment(userLists[i]['report'][0]['createTime'])
          }
          for(var k=1;k<userLists[i]['report'].length;k++) {
            if(Moment(userLists[i]['report'][k]['createTime']).isAfter(recentReport)){
              recentReport = Moment(userLists[i]['report'][k]['createTime'])
            }
          }
          userLists[i]['recent'] = '-'
          if(recentReport){
            userLists[i]['recent'] = recentReport.toISOString()
          }
        }
        userLists = userLists.sort(function(a:Data, b:Data) {
          if (!a.recent) {
             return 0;
          }
      
          if (!b.recent) {
             return 0;
          }
          return b.recent.localeCompare(a.recent);
      });
      setUserList(userLists)
      })
    });
  };

  const setReport = () => {
    getReport().then(reportsLists => {
    setReportsList(reportsLists)
    setAllReportsLists(reportsLists)
    })
  };  

  Moment.locale('en');

  useEffect(() => {setUser()}, []) 
  useEffect(() => {setReport()}, []) 
  
  const rows = userList.map((user : Data) => fillData(user, allReportsLists.filter((report: Report) => report.reporter === user._id)));
  const reportRows = reportsList.map(report => fillReport(report));

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
  
  const handleReport = (id : string) => {
    setOpen(true);
    getReport().then(report =>{
      setAllReportsLists(report)
      setReportsList(report.filter((report: Report) => report.reporter === id))
    })
  }

  const handleClose = () => {
    setOpen(false);
  };

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
            {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => {
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
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Reports
        </DialogTitle>
        <DialogContent dividers>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {reportColumns.map((reportColumns) => (
                <TableCell
                  key={reportColumns.id}
                  align='center'
                >
                  {reportColumns.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {reportRows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1}>
                  {reportColumns.map((column) => {
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>      
    </div>
  );
}
