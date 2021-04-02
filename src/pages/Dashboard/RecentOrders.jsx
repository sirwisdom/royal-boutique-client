import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
// import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizRoundedIcon from "@material-ui/icons/MoreHorizRounded";

import NumberFormat from "react-number-format";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
// import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  recentOrdersRoot: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  capitalize: {
    textTransform: "capitalize",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  title: {
    fontWeight: 400,
    flex: "1 1 100%",
    textAlign: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableHead: {
    fontWeight: "bold",
  },
  recentOrderTitle: {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 500,
    textTransform: "capitalize",
  },
  categoryStyle: {
    textTransform: "capitalize",
  },
  categoryImage: {
    objectFit: "contain",
    width: "50px",
    height: "50px",
  },
  uppercase: {
    textTransform: "uppercase",
  },
  successText: {
    color: theme.palette.success.main,
  },
  errorText: {
    textTransform: theme.palette.secondary.main,
  },
  button: {
    float: "right",
    textTransform: "capitalize",
    width: "350px",
    color: theme.palette.grey[50],
    background: theme.palette.grey[900],
    borderRadius: "23px",
    transition: "all 0.5s ease-in",
    "&:hover": {
      background: theme.palette.yellow.dark,
    },
    [theme.breakpoints.down("xs")]: {
      width: "280px",
    },
  },
}));

const headCells = [
  { id: "SN", label: "SN" },

  {
    id: "Date ",
    label: "Date ",
  },
  {
    id: "Order Number",
    label: "Order Number",
  },
  { id: "Quantity Of Items", label: "Quantity Of Items" },

  {
    id: "Order Status",
    label: "Order Status",
  },

  {
    id: "Amount",
    label: "Amount",
  },
  {
    id: "Actions ",
    label: " ",
  },
];

function EnhancedTableHead() {
  const classes = useStyles();
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            className={classes.tableHead}
            key={headCell.id}
            align="left"
            padding="default"
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function RecentOrders() {
  const classes = useStyles();

  return (
    <div className={classes.recentOrdersRoot}>
      <Container maxWidth="lg">
        <div>
          <TableContainer>
            <Box mb={1} mt={1}>
              <Typography
                className={classes.recentOrderTitle}
                gutterBottom
                variant="h6"
              >
                Recent Orders
              </Typography>
            </Box>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              aria-label="enhanced table"
              size="small"
            >
              <EnhancedTableHead classes={classes} />
              <TableBody>
                <TableRow hover tabIndex={-1}>
                  <TableCell className={classes.capitalize} align="left">
                    1
                  </TableCell>
                  <TableCell align="left" className={classes.capitalize}>
                    {dayjs("2021-01-31").fromNow()}{" "}
                  </TableCell>
                  <TableCell className={classes.uppercase}>
                    {" "}
                    SIRWISDOM001
                  </TableCell>
                  <TableCell align="left"> 25</TableCell>
                  <TableCell className={classes.successText}>
                    {" "}
                    Delivered
                  </TableCell>

                  <TableCell align="left" className={classes.capitalize}>
                    <NumberFormat
                      value={30000}
                      displayType={"text"}
                      thousandSeparator={true}
                      renderText={(value) => (
                        <Typography variant="body2" component="p" align="left">
                          {" "}
                          &#8358;{value}
                        </Typography>
                      )}
                    />{" "}
                  </TableCell>
                  <TableCell>
                    <IconButton size="small">
                      <MoreHorizRoundedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Container>
    </div>
  );
}

export default RecentOrders;
