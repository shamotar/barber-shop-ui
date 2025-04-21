import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  CircularProgress,
} from "@mui/material";
import { useKeycloak } from "../hooks/useKeycloak";
import { fetchAppointments } from "../effects/appointment"; // Replace with your actual API call

interface Appointment {
  id: number;
  barberName: string;
  date: string;
  time: string;
  isPast: boolean;
}

export default function Appointments() {
  const { keycloak } = useKeycloak();
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [pastAppointments, setPastAppointments] = useState<Appointment[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!keycloak?.token) return;

      try {
        setLoading(true);
        const data = await fetchAppointments(keycloak.token); // Fetch appointments from API
        setAppointments(data);

        // Separate past and upcoming appointments
        const now = new Date();
        setPastAppointments(data.filter((appt) => new Date(appt.date) < now));
        setUpcomingAppointments(data.filter((appt) => new Date(appt.date) >= now));
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [keycloak]);

  if (!keycloak) {
    return null;
  }

  return (
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
              <List>
                {upcomingAppointments.map((appt) => (
                  <ListItem key={appt.id}>
                    <ListItemText
                      primary={`${appt.barberName} - ${appt.date} at ${appt.time}`}
                      secondary="Upcoming"
                    />
                    <ListItemSecondaryAction>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => alert(`View details for appointment ${appt.id}`)}
                      >
                        View Details
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
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
                  <ListItem key={appt.id}>
                    <ListItemText
                      primary={`${appt.barberName} - ${appt.date} at ${appt.time}`}
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
  );
}