import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ordersApiEndpoint } from "../../Utils/config";
import { setSnackbar } from "../../redux/actions/uiActions";

export default function OrderCancelDialog(props) {
  const {
    handleCloseOrderDialog,
    openCancelOrderDialog,
    toggleHasChange,
    orderId,
  } = props;

  const [isSubmtting, setIsSubmtting] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    if (isSubmtting) {
      return null;
    }
    return handleCloseOrderDialog();
  };
  const handleSubmit = () => {
    setIsSubmtting(true);
    axios
      .put(`${ordersApiEndpoint}/admin/update/${orderId}`, {
        isCancelled: true,
        isPaid: false,
        isDelivered: false,
        isShipped: false,
      })
      .then((res) => {
        dispatch(setSnackbar("Order Cancellation was successfully", "success"));
        setIsSubmtting(false);

        setTimeout(() => {
          handleCloseOrderDialog();
          toggleHasChange();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setIsSubmtting(false);
        if (err.message) {
          dispatch(setSnackbar(err.message, "error"));
        }
        if (err.response && err.response.data && err.response.data.message) {
          console.log(err.response.data);
          dispatch(setSnackbar(err.response.data.message, "error"));
        }
      });
  };
  return (
    <div>
      <Dialog
        open={openCancelOrderDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" color="secondary">
          CANCEL ORDER
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you wish to cancel this order, click on the continue button to
            proceed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={isSubmtting}
            onClick={handleCloseOrderDialog}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={isSubmtting}
            onClick={handleSubmit}
            color="secondary"
          >
            {isSubmtting ? "Cancelling" : "Confirm"}
          </Button>
        </DialogActions>
        <br />
      </Dialog>
    </div>
  );
}
