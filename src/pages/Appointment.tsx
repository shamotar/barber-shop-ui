import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Base from "./Base";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Paper, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BookingDetails from "../components/BookingDetails";
import { deleteAppointment } from "../effects/appointment";
import { useKeycloak } from "../hooks/useKeycloak";
import { useSnackBar } from "../context/SnackBarContext"; 

""
export default function Appointment() {
  const { keycloak } = useKeycloak();
  if (!keycloak) {
    return null;
  }
  const appointmentId = useParams().appointmentId;
  const navigate = useNavigate();
  const { showSnackBar } = useSnackBar();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleBackToHome = () => {
    navigate("/");
  };

  const openDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteAppointment(
        keycloak.token ? keycloak.token : "",
        parseInt(appointmentId!)
      )
      showSnackBar("Appointment cancelled successfully", "success");
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting appointment:", error);
    } finally {
      setDeleteDialogOpen(false);
    }
    navigate("/appointments");
  };

  return (
    <Base
      children={
        <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 2 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Appointment Details
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Here are the details of your appointment:
            </Typography>

            <Divider sx={{ my: 2 }} />

            <BookingDetails appointmentId={parseInt(appointmentId!)} />

            <Divider sx={{ my: 2 }} />

            {/* Cancel Appointment Button */}
            <Stack spacing={2} sx={{ mb: 2 }}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                startIcon={<DeleteIcon />} // Add the trash icon
                onClick={() => {
                  openDeleteDialog();
                }}
              >
                Cancel Appointment
              </Button>

              {/* Back to Home Button */}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleBackToHome}
              >
                Back to Home
              </Button>
            </Stack>
          </Paper>

          {/* Delete Confirmation Dialog */}
          <Dialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
          >
            <DialogTitle>Cancel Appointment</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to cancel this appointment? This cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleDelete} color="primary" variant="contained">
                Confirm Cancellation
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      }
    />
  );
}