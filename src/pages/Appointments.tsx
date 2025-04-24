import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  CircularProgress,
} from "@mui/material";
import { useKeycloak } from "../hooks/useKeycloak";
import { fetchAppointments } from "../effects/appointment"; // Replace with your actual API call
import { useMe } from "../hooks/useMe";
import { AppointmentResponse, TimeSlotChildResponse, UserBase } from "../api";
import Base from "./Base";
import { useNavigate } from "react-router";
import { useSnackBar } from "../context/SnackbarContext";

export default function Appointments() {
  const { keycloak } = useKeycloak();
  const { user } = useMe();
  if (!user) {
    return null; // Handle case where user is not available
  }
  const { showSnackBar } = useSnackBar();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [pastAppointments, setPastAppointments] = useState<AppointmentResponse[]>([]);
  const [pastPage, setPastPage] = useState(1);
  const [upcomingAppointments, setUpcomingAppointments] = useState<AppointmentResponse[]>([]);
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [currentLimit] = useState(10);

  // State to hold upcoming appointments
  useEffect(() => {
    const fetchData = async () => {
      if (!keycloak?.token) return;
      try {
        setLoading(true);
        const data = await fetchAppointments(keycloak.token, pastPage, currentLimit, user.user_id, undefined, true, undefined);
        if (!data) {
          throw new Error("Failed to load appointments. Please try again later.");
        }
        // Set appointments
        const newAppointments = data.filter((appt) => !upcomingAppointments.some((a) => a.appointment_id === appt.appointment_id));
        setUpcomingAppointments((prev) => [...prev, ...newAppointments]);
        console.log("Appointments fetched:", upcomingAppointments);
      } catch (error) {
        showSnackBar("Failed to load appointments. Please try again later.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [pastPage]);

  useEffect(() => {
    const now = new Date();
    const past = appointments.filter((appt) => new Date(appt.appointment_date) < now);
    const upcoming = appointments.filter((appt) => new Date(appt.appointment_date) >= now);
    setPastAppointments(past);
    setUpcomingAppointments(upcoming);
  }, [appointments]);

  const getBarberName = (user: UserBase) => {
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return "Unknown Barber";
  }

  const parseTime = (slot: TimeSlotChildResponse) => {
    const hour = parseInt(slot.start_time.split(":")[0]);
    const minutes = slot.start_time.split(":")[1];
    const timeString = `${hour === 12 ? 12 : hour % 12}:${minutes} ${hour >= 12 ? "PM" : "AM"}`;
    return timeString;
  }

  if (!keycloak) {
    return null;
  }

  return (
    <Base>
      <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, p: 2 }}>
        <Typography variant="h4" gutterBottom>
          My Appointments
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Upcoming Appointments */}
            <Paper elevation={3} sx={{ mb: 4, p: 2 }}>
              <Typography variant="h5" gutterBottom>
                Upcoming Appointments
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {upcomingAppointments.length > 0 ? (
                <Box>
                  <List>
                    {upcomingAppointments.map((appt) => (
                      <ListItem key={appt.appointment_id} secondaryAction={
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => navigate(`/appointments/${appt.appointment_id}`)}
                        >
                          View Details
                        </Button>
                      }>
                        <ListItemText
                          primary={`${getBarberName(appt.barber.user)} - ${new Date(appt.appointment_date).toLocaleDateString()} at ${parseTime(appt.time_slots[0])}`}
                          secondary="Upcoming"
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Divider sx={{ my: 2 }} />
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    Load More
                  </Button>
                </Box>
              ) : (
                <Typography variant="body1" color="textSecondary">
                  No upcoming appointments.
                </Typography>
              )}
            </Paper>

            {/* Past Appointments */}
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>
                Past Appointments
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {pastAppointments.length > 0 ? (
                <List>
                  {pastAppointments.map((appt) => (
                    <ListItem key={appt.appointment_id}>
                      <ListItemText
                        primary={`${getBarberName(appt.barber.user)} - ${new Date(appt.appointment_date).toLocaleDateString()} at ${parseTime(appt.time_slots[0])}`}
                        secondary="Completed"
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body1" color="textSecondary">
                  No past appointments.
                </Typography>
              )}
            </Paper>
          </>
        )}
      </Box>
    </Base>

  );
}