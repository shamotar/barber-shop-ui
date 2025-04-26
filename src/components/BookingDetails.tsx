import { Box, Typography } from "@mui/material";
import { useKeycloak } from "../hooks/useKeycloak";
import { useEffect, useState } from "react";
import { AppointmentResponse } from "../api";
import { fetchAppointment } from "../effects/appointment";


interface BookingProps {
  appointmentId: number;
}

export default function BookingDetails({
  appointmentId,
}: BookingProps) {
  const { keycloak } = useKeycloak();
  if (!keycloak) {
    // Loading state
    return <div>Loading...</div>;
  }
  const [appointment, setAppointment] = useState<AppointmentResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [barberName, setBarberName] = useState<string>();
  const [appointmentServices, setAppointmentServices] = useState<string[]>([]);
  const [appointmentDate, setAppointmentDate] = useState<string>();
  const [appointmentTime, setAppointmentTime] = useState<string>();
  const [appointmentDuration, setAppointmentDuration] = useState<number>();
  const [appointmentTotalPrice, setAppointmentTotalPrice] = useState<number>(0);

  useEffect(() => {
    if (!keycloak.token) {
      return;
    }
    setLoading(true);
    fetchAppointment(
      keycloak.token,
      appointmentId
    )
      .then((appointment: AppointmentResponse) => {
        setAppointment(appointment);
        // Barber Name
        setBarberName(appointment.barber.user.firstName + " " + appointment.barber.user.lastName);

        // Services
        const services = appointment.services.map((service) => service.name);
        setAppointmentServices(services);

        // Appointment Date
        const date = new Date(appointment.appointment_date);
        const options: Intl.DateTimeFormatOptions = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        };
        const formattedDate = date.toLocaleDateString("en-US", options);
        setAppointmentDate(formattedDate);

        // Appointment Time
        const slot = appointment.time_slots[0];
        const hour = parseInt(slot.start_time.split(":")[0]);
        const minutes = slot.start_time.split(":")[1];
        const timeString = `${hour === 12 ? 12 : hour % 12}:${minutes} ${hour >= 12 ? "PM" : "AM"}`;
        setAppointmentTime(timeString);

        // Appointment Duration
        const duration = Math.max(
          ...appointment.services.map((service) => service.duration)
        );
        setAppointmentDuration(duration);

        // Total Price
        const totalPrice = appointment.services.reduce((total, service) => {
          return total + Number(service.price);
        }, 0);
        setAppointmentTotalPrice(totalPrice);

        setLoading(false);

      })
      .catch((err) => {
        console.error("Failed to fetch appointment:", err);
        setError("Failed to fetch appointment");
        setLoading(false);
      });
  }, []);

  return (

    <Box>
      {/* Show loading until appointment is set */}
      {loading && <Typography variant="body1">Loading...</Typography>}
      {error && <Typography variant="body1" color="error">{error}</Typography>}
      {appointment && (
        <Box>
          {/* Appointment Details */}
          < Box sx={{ mb: 2 }
          }>
            <Typography variant="h6" gutterBottom>
              Barber:
            </Typography>
            <Typography variant="body1">{barberName}</Typography>
          </Box >

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Services:
            </Typography>
            <Typography variant="body1">
              {appointmentServices.join(", ")}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Date:
            </Typography>
            <Typography variant="body1">{appointmentDate}</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Time:
            </Typography>
            <Typography variant="body1">{appointmentTime}</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Duration:
            </Typography>
            <Typography variant="body1">{appointmentDuration} minutes</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Total Price:
            </Typography>
            <Typography variant="body1">${appointmentTotalPrice.toFixed(2)}</Typography>
          </Box>
        </Box>
      )}
    </Box >
  );
}