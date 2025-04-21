import React from "react";
import { useNavigate, useParams } from "react-router";
import Base from "./Base";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import BookingDetails from "../components/BookingDetails";

export default function AppointmentConfirmation() {
  const appointmentId = useParams().appointmentId;
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <Base
      children={
        <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 2 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Appointment Confirmed!
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Thank you for booking with us. Here are your appointment details:
            </Typography>

            <Divider sx={{ my: 2 }} />

            <BookingDetails appointmentId={parseInt(appointmentId!)} />

            <Divider sx={{ my: 2 }} />

            {/* Back to Home Button */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleBackToHome}
            >
              Back to Home
            </Button>
          </Paper>
        </Box>
      }
    />
  );
}