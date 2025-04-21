import { deleteAppointmentApiV1AppointmentsAppointmentIdDelete, getAppointmentApiV1AppointmentsAppointmentIdGet, getAppointmentsApiV1AppointmentsGet } from "../api";

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
  userId?: number,
  barberId?: number
): Promise<any[]> {
  try {
    const { response, data } = await getAppointmentsApiV1AppointmentsGet({
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      query: {
        page: 1,
        limit: 100,
      }
    });
    if (!response.ok) {
      throw new Error("Failed to load appointments. Please try again later.");
    }
    if (!data) {
      throw new Error("Failed to load appointments. Please try again later.");
    }
    return data;
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