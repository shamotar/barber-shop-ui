import { AppointmentResponse, deleteAppointmentApiV1AppointmentsAppointmentIdDelete, getAppointmentApiV1AppointmentsAppointmentIdGet, getAppointmentsApiV1AppointmentsGet, getPastAppointments, getUpcomingAppointments } from "../api";

export async function fetchAppointment(
  authToken: string,
  appointmentId: number
): Promise<any> {
  try {
    const { response, data } = await getAppointmentApiV1AppointmentsAppointmentIdGet({
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      path: {
        appointment_id: appointmentId,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to load appointment. Please try again later.");
    }
    if (!data) {
      throw new Error("Failed to load appointment. Please try again later.");
    }
    return data;
  } catch (err) {
    throw new Error("Failed to load appointment. Please try again later.");
  }
}

export async function fetchAppointments(
  authToken: string,
  page: number,
  limit: number,
  userId?: number,
  barberId?: number,
  upcoming?: boolean,
  past?: boolean
): Promise<AppointmentResponse[]> {
  const headers = {
    Authorization: `Bearer ${authToken}`,
  };
  const query = {
    page,
    limit,
    user_id: userId,
    barber_id: barberId,
  };
  try {
    if (upcoming) {
      const { response, data } = await getUpcomingAppointments({
        headers,
        query,
      });
      if (!response.ok) {
        throw new Error("Failed to load appointments. Please try again later.");
      }
      if (!data) {
        throw new Error("Failed to load appointments. Please try again later.");
      }
      return data;
    } else if (past) {
      const { response, data } = await getPastAppointments({
        headers,
        query,
      });
      if (!response.ok) {
        throw new Error("Failed to load appointments. Please try again later.");
      }
      if (!data) {
        throw new Error("Failed to load appointments. Please try again later.");
      }
      return data;
    } else {
      const { response, data } = await getAppointmentsApiV1AppointmentsGet({
        headers,
        query,
      });
      if (!response.ok) {
        throw new Error("Failed to load appointments. Please try again later.");
      }
      if (!data) {
        throw new Error("Failed to load appointments. Please try again later.");
      }
      return data;
    }
  } catch (err) {
    throw new Error("Failed to load appointments. Please try again later.");
  }
}

export async function deleteAppointment(
  authToken: string,
  appointmentId: number
): Promise<void> {
  try {
    const { response } = await deleteAppointmentApiV1AppointmentsAppointmentIdDelete({
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      path: {
        appointment_id: appointmentId,
      }
    })
    if (!response.ok) {
      throw new Error("Failed to delete appointment. Please try again later.");
    }
  } catch (err) {
    throw new Error("Failed to delete appointment. Please try again later.");
  }
}