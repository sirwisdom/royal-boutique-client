import React, { useState, useEffect } from "react";
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
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizRoundedIcon from "@material-ui/icons/MoreHorizRounded";
import NumberFormat from "react-number-format";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ordersApiEndpoint } from "../../Utils/config";
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
    color: theme.palette.error.main,
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
  noOrderBoxPaper: {
    marginTop: theme.spacing(2),
  },
  noOrderBox: {
    padding: theme.spacing(6, 2),
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
  const userData = useSelector((state) => state.user.data);
  const history = useHistory();
  const [userOrder, setUserOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${ordersApiEndpoint}/user-recent/${userData._id}`)
      .then((res) => {
        setUserOrder(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userData._id]);

  return loading ? null : (
    <div className={classes.recentOrdersRoot}>
      <Container maxWidth="lg">
        {userOrder && userOrder.length > 0 ? (
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
                  {userOrder &&
                    userOrder.length > 0 &&
                    userOrder.map((row, index) => (
                      <TableRow key={row._id} hover tabIndex={-1}>
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
                            <MoreHorizRoundedIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          <Paper className={classes.noOrderBoxPaper}>
            <Box className={classes.noOrderBox}>
              <Typography variant="body2">
                Hi, you have not made any orders yet... visit our shop to try
                out our exclusive collections
              </Typography>{" "}
            </Box>
          </Paper>
        )}
      </Container>
    </div>
  );
}

export default RecentOrders;
