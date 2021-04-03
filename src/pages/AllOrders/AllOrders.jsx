import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router-dom";
import { ordersApiEndpoint } from "../../Utils/config";
import Preloader from "../../components/Preloader/Preloader";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
// import MetaDecorator from "../../components/MetaDecorator/MetaDecorator";
// import { authForExcos } from "../../utils/excosAuth";

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
    id: "Delivery Status",
    label: "Delivery Status",
  },

  {
    id: "Amount",
    label: "Amount",
  },
  {
    id: "Payment Status",
    label: "Payment Status",
  },
  {
    id: "Actions ",
    label: " ",
  },
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align="left" padding="default">
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
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
  categoryStyle: {
    textTransform: "capitalize",
  },
  successText: {
    color: theme.palette.success.main,
  },
  errorText: {
    color: theme.palette.secondary.main,
  },
}));

function Orders() {
  const classes = useStyles();
  const userData = useSelector((state) => state.user.data);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [allOrders, setAllOrders] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const history = useHistory();

  const limit = 50;

  const getOrders = useCallback(() => {
    axios
      .get(
        `${ordersApiEndpoint}/user/${userData._id}/?pageNumber=${pageNumber}&limit=${limit}`
      )
      .then((res) => {
        setData(res.data);
        setAllOrders(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pageNumber, userData._id]);

  useEffect(() => {
    getOrders();
  }, [pageNumber, getOrders, userData._id]);

  const handleChangePage = (event, newPage) => {
    setPageNumber(newPage);
    // setLoading(true);
    getOrders();
  };

  //   let decorator = {
  //     title: "MFMCF NDU Alumni Members",
  //     description: "MFMCF NDU Alumni members",
  //     keywords: " ",
  //   };

  return loading ? (
    <Preloader />
  ) : allOrders.length < 1 ? (
    <div className={classes.root}>
      {/* <MetaDecorator decorator={decorator} /> */}
      <Container>
        <Box m={6}>
          <Typography variant="h4">
            Sorry there are currently no orders made...
          </Typography>
        </Box>
      </Container>
    </div>
  ) : (
    <div className={classes.root}>
      <Container>
        <Paper className={classes.paper}>
          <Typography className={classes.title} variant="h6" id="tableTitle">
            My Orders
          </Typography>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              aria-label="enhanced table"
              size="medium"
            >
              <EnhancedTableHead classes={classes} />
              <TableBody>
                {allOrders.length > 0 &&
                  allOrders.map((row, index) => {
                    return (
                      <TableRow hover tabIndex={-1}>
                        <TableCell className={classes.capitalize} align="left">
                          {index + 1}
                        </TableCell>
                        <TableCell align="left" className={classes.capitalize}>
                          {dayjs(row.createdAt).fromNow()}{" "}
                        </TableCell>
                        <TableCell className={classes.uppercase}>
                          {row.orderId}
                        </TableCell>
                        <TableCell align="left">
                          {row?.orderedItems?.reduce(
                            (total, item) => item.qty + total,
                            0
                          )}
                        </TableCell>
                        {row.isDispatched ? (
                          <TableCell className={classes.successText}>
                            Delivered
                          </TableCell>
                        ) : (
                          <TableCell className={classes.errorText}>
                            Not Delivered
                          </TableCell>
                        )}

                        <TableCell align="left" className={classes.capitalize}>
                          <NumberFormat
                            value={row?.orderedItems?.reduce(
                              (total, item) => item.qty * item.price + total,
                              0
                            )}
                            displayType={"text"}
                            thousandSeparator={true}
                            renderText={(value) => (
                              <Typography
                                variant="body2"
                                component="p"
                                align="left"
                              >
                                {" "}
                                &#8358;{value}
                              </Typography>
                            )}
                          />{" "}
                        </TableCell>
                        {row.isPaid ? (
                          <TableCell className={classes.successText}>
                            Paid
                          </TableCell>
                        ) : (
                          <TableCell className={classes.errorText}>
                            Not Paid
                          </TableCell>
                        )}
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() =>
                              history.push(
                                `/dasboard/my-orders/order-detail/${row._id}`
                              )
                            }
                          >
                            <MoreHorizIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={data.totalCount}
            rowsPerPage={data.rowsPerPage}
            page={pageNumber}
            onChangePage={handleChangePage}
          />
        </Paper>
      </Container>
    </div>
  );
}

export default Orders;
