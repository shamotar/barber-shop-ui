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
  Stack,
} from "@mui/material";
import { useKeycloak } from "../hooks/useKeycloak";
import { fetchAppointments } from "../effects/appointment"; // Replace with your actual API call
import { useMe } from "../hooks/useMe";
import { AppointmentResponse, TimeSlotChildResponse, UserBase } from "../api";
import Base from "./Base";
import { useNavigate } from "react-router";
import { useSnackBar } from "../context/SnackbarContext";
import { checkUserRole } from "../common/roleChecking";

export default function Appointments() {
  const { keycloak } = useKeycloak();
  const { user, loading } = useMe();
  if (!user || !keycloak || loading) {
    return null; // Handle case where user is not available
  }

  const { showSnackBar } = useSnackBar();
  const navigate = useNavigate();

  const [isBarber, setIsBarber] = useState(false);
  const [loadingHere, setloadingHere] = useState(true);
  const [pastAppointments, setPastAppointments] = useState<AppointmentResponse[]>([]);
  const [pastPage, setPastPage] = useState(1);
  const [upcomingAppointments, setUpcomingAppointments] = useState<AppointmentResponse[]>([]);
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [currentLimit] = useState(10);

  // Check if the user is a barber
  useEffect(() => {
    if (keycloak) {
      const isBarber = checkUserRole(keycloak, "barber");
      setIsBarber(isBarber);
    }
  }, [keycloak]);

  // State to hold upcoming appointments
  useEffect(() => {
    const fetchData = async () => {
      if (!keycloak?.token || loading) return;
      try {
        setloadingHere(true);
        const isBarber = checkUserRole(keycloak, "barber");
        const data = await fetchAppointments(keycloak.token, upcomingPage, currentLimit, isBarber, user.user_id, true, undefined);
        if (!data) {
          throw new Error("Failed to load appointments. Please try again later.");
        }
        // Set appointments
        const newAppointments = data.filter((appt) => !upcomingAppointments.some((a) => a.appointment_id === appt.appointment_id));
        setUpcomingAppointments((prev) => [...prev, ...newAppointments]);
      } catch (error) {
        showSnackBar("Failed to load appointments. Please try again later.", "error");
      } finally {
        setloadingHere(false);
      }
    };
    fetchData();
  }, [upcomingPage]);


  // State to hold past appointments
  useEffect(() => {
    const fetchData = async () => {
      if (!keycloak?.token || loading) return;
      try {
        setloadingHere(true);
        const isBarber = checkUserRole(keycloak, "barber");
        const data = await fetchAppointments(keycloak.token, pastPage, currentLimit, isBarber, user.user_id, undefined, true);
        if (!data) {
          throw new Error("Failed to load appointments. Please try again later.");
        }
        // Set appointments
        const newAppointments = data.filter((appt) => !upcomingAppointments.some((a) => a.appointment_id === appt.appointment_id));
        setPastAppointments((prev) => [...prev, ...newAppointments]);
      } catch (error) {
        showSnackBar("Failed to load appointments. Please try again later.", "error");
      } finally {
        setloadingHere(false);
      }
    };
    fetchData();
  }, [pastPage]);

  const getUserName = (user: UserBase) => {
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return "Unknown User";
  }

  const parseTime = (slot: TimeSlotChildResponse) => {
    const hour = parseInt(slot.start_time.split(":")[0]);
    const minutes = slot.start_time.split(":")[1];
    const timeString = `${hour === 12 ? 12 : hour % 12}:${minutes} ${hour >= 12 ? "PM" : "AM"}`;
    return timeString;
  }

  const parseAppointmentDetails = (appointment: AppointmentResponse) => {
    const barberName = getUserName(appointment.barber.user);
    const userName = getUserName(appointment.user);
    const appointmentDate = new Date(appointment.appointment_date);
    const formattedDate = appointmentDate.toLocaleDateString();
    const formattedTime = parseTime(appointment.time_slots[0]);
    if (isBarber) {
      return `${userName} - ${formattedDate} at ${formattedTime}`;
    }
    return `${barberName} - ${formattedDate} at ${formattedTime}`;
  }

  return (
    <Base>
      <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, p: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
          <Typography variant="h4">
            My Appointments
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/book-appointment")}
          >
            Book New Appointment
          </Button>
        </Stack>

        {loadingHere ? (
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
                          primary={parseAppointmentDetails(appt)}
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
                    onClick={() => setUpcomingPage((prev) => prev + 1)}
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
                <Box>
                  <List>
                    {pastAppointments.map((appt) => (
                      <ListItem key={appt.appointment_id}>
                        <ListItemText
                          primary={parseAppointmentDetails(appt)}
                          secondary="Completed"
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Divider sx={{ my: 2 }} />
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => setPastPage((prev) => prev + 1)}
                  >
                    Load More
                  </Button>
                </Box>
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