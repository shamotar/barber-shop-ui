// This file is auto-generated by @hey-api/openapi-ts

import { type Options as ClientOptions, type TDataShape, type Client, urlSearchParamsBodySerializer } from '@hey-api/client-fetch';
import type { LoginApiV1AuthLoginPostData, LoginApiV1AuthLoginPostResponse, LoginApiV1AuthLoginPostError, GetUsersApiV1UsersGetData, GetUsersApiV1UsersGetResponse, GetUsersApiV1UsersGetError, CreateUserApiV1UsersPostData, CreateUserApiV1UsersPostResponse, CreateUserApiV1UsersPostError, DeleteUserApiV1UsersUserIdDeleteData, DeleteUserApiV1UsersUserIdDeleteResponse, DeleteUserApiV1UsersUserIdDeleteError, GetUserApiV1UsersUserIdGetData, GetUserApiV1UsersUserIdGetResponse, GetUserApiV1UsersUserIdGetError, UpdateUserApiV1UsersUserIdPutData, UpdateUserApiV1UsersUserIdPutResponse, UpdateUserApiV1UsersUserIdPutError, GetAllBarbersApiV1BarbersGetData, GetAllBarbersApiV1BarbersGetResponse, GetAllBarbersApiV1BarbersGetError, CreateBarberApiV1BarbersPostData, CreateBarberApiV1BarbersPostResponse, CreateBarberApiV1BarbersPostError, GetBarberByIdApiV1BarbersBarberIdGetData, GetBarberByIdApiV1BarbersBarberIdGetResponse, GetBarberByIdApiV1BarbersBarberIdGetError, GetAllServicesApiV1ServicesGetData, GetAllServicesApiV1ServicesGetResponse, GetAllServicesApiV1ServicesGetError, CreateServiceApiV1ServicesPostData, CreateServiceApiV1ServicesPostResponse, CreateServiceApiV1ServicesPostError, DeleteServiceApiV1ServicesServiceIdDeleteData, DeleteServiceApiV1ServicesServiceIdDeleteResponse, DeleteServiceApiV1ServicesServiceIdDeleteError, UpdateServiceApiV1ServicesServiceIdPutData, UpdateServiceApiV1ServicesServiceIdPutResponse, UpdateServiceApiV1ServicesServiceIdPutError, GetSchedulesApiV1SchedulesGetData, GetSchedulesApiV1SchedulesGetResponse, GetSchedulesApiV1SchedulesGetError, CreateScheduleApiV1SchedulesPostData, CreateScheduleApiV1SchedulesPostResponse, CreateScheduleApiV1SchedulesPostError, DeleteScheduleApiV1SchedulesScheduleIdDeleteData, DeleteScheduleApiV1SchedulesScheduleIdDeleteResponse, DeleteScheduleApiV1SchedulesScheduleIdDeleteError, GetScheduleApiV1SchedulesScheduleIdGetData, GetScheduleApiV1SchedulesScheduleIdGetResponse, GetScheduleApiV1SchedulesScheduleIdGetError, UpdateScheduleApiV1SchedulesScheduleIdPutData, UpdateScheduleApiV1SchedulesScheduleIdPutResponse, UpdateScheduleApiV1SchedulesScheduleIdPutError, GetAppointmentsApiV1AppointmentsGetData, GetAppointmentsApiV1AppointmentsGetResponse, GetAppointmentsApiV1AppointmentsGetError, CreateAppointmentApiV1AppointmentsPostData, CreateAppointmentApiV1AppointmentsPostResponse, CreateAppointmentApiV1AppointmentsPostError, DeleteAppointmentApiV1AppointmentsAppointmentIdDeleteData, DeleteAppointmentApiV1AppointmentsAppointmentIdDeleteResponse, DeleteAppointmentApiV1AppointmentsAppointmentIdDeleteError, GetAppointmentApiV1AppointmentsAppointmentIdGetData, GetAppointmentApiV1AppointmentsAppointmentIdGetResponse, GetAppointmentApiV1AppointmentsAppointmentIdGetError, UpdateAppointmentApiV1AppointmentsAppointmentIdPutData, UpdateAppointmentApiV1AppointmentsAppointmentIdPutResponse, UpdateAppointmentApiV1AppointmentsAppointmentIdPutError, CreateThreadApiV1ThreadsPostData, CreateThreadApiV1ThreadsPostResponse, CreateThreadApiV1ThreadsPostError, GetThreadsByUserIdApiV1ThreadsLoggedUserIdAndOtherUserIdGetData, GetThreadsByUserIdApiV1ThreadsLoggedUserIdAndOtherUserIdGetResponse, GetThreadsByUserIdApiV1ThreadsLoggedUserIdAndOtherUserIdGetError, GetAllThreadsByUserIdApiV1ThreadsUserIdGetData, GetAllThreadsByUserIdApiV1ThreadsUserIdGetResponse, GetAllThreadsByUserIdApiV1ThreadsUserIdGetError, CreateMessageApiV1MessagesPostData, CreateMessageApiV1MessagesPostResponse, CreateMessageApiV1MessagesPostError, UpdateHasActiveMessageBooleanApiV1MessagesMessageIdPutData, UpdateHasActiveMessageBooleanApiV1MessagesMessageIdPutResponse, UpdateHasActiveMessageBooleanApiV1MessagesMessageIdPutError, RootGetData, RootHealthzGetData } from './types.gen';
import { client as _heyApiClient } from './client.gen';

export type Options<TData extends TDataShape = TDataShape, ThrowOnError extends boolean = boolean> = ClientOptions<TData, ThrowOnError> & {
    /**
     * You can provide a client instance returned by `createClient()` instead of
     * individual options. This might be also useful if you want to implement a
     * custom client.
     */
    client?: Client;
    /**
     * You can pass arbitrary values through the `meta` object. This can be
     * used to access values that aren't defined as part of the SDK function.
     */
    meta?: Record<string, unknown>;
};

/**
 * Login
 * Login endpoint to authenticate the user and return an access token.
 *
 * Args:
 * username (str): The username of the user attempting to log in.
 * password (str): The password of the user.
 *
 * Returns:
 * TokenResponse: Contains the access token upon successful authentication.
 */
export const loginApiV1AuthLoginPost = <ThrowOnError extends boolean = false>(options: Options<LoginApiV1AuthLoginPostData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<LoginApiV1AuthLoginPostResponse, LoginApiV1AuthLoginPostError, ThrowOnError>({
        ...urlSearchParamsBodySerializer,
        url: '/api/v1/auth/login',
        ...options,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...options?.headers
        }
    });
};

/**
 * Get Users
 */
export const getUsersApiV1UsersGet = <ThrowOnError extends boolean = false>(options?: Options<GetUsersApiV1UsersGetData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<GetUsersApiV1UsersGetResponse, GetUsersApiV1UsersGetError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/api/v1/users',
        ...options
    });
};

/**
 * Create User
 */
export const createUserApiV1UsersPost = <ThrowOnError extends boolean = false>(options: Options<CreateUserApiV1UsersPostData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<CreateUserApiV1UsersPostResponse, CreateUserApiV1UsersPostError, ThrowOnError>({
        url: '/api/v1/users',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Delete User
 */
export const deleteUserApiV1UsersUserIdDelete = <ThrowOnError extends boolean = false>(options: Options<DeleteUserApiV1UsersUserIdDeleteData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).delete<DeleteUserApiV1UsersUserIdDeleteResponse, DeleteUserApiV1UsersUserIdDeleteError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/api/v1/users/{user_id}',
        ...options
    });
};

/**
 * Get User
 */
export const getUserApiV1UsersUserIdGet = <ThrowOnError extends boolean = false>(options: Options<GetUserApiV1UsersUserIdGetData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<GetUserApiV1UsersUserIdGetResponse, GetUserApiV1UsersUserIdGetError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/api/v1/users/{user_id}',
        ...options
    });
};

/**
 * Update User
 */
export const updateUserApiV1UsersUserIdPut = <ThrowOnError extends boolean = false>(options: Options<UpdateUserApiV1UsersUserIdPutData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).put<UpdateUserApiV1UsersUserIdPutResponse, UpdateUserApiV1UsersUserIdPutError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/api/v1/users/{user_id}',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Get All Barbers
 */
export const getAllBarbersApiV1BarbersGet = <ThrowOnError extends boolean = false>(options?: Options<GetAllBarbersApiV1BarbersGetData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<GetAllBarbersApiV1BarbersGetResponse, GetAllBarbersApiV1BarbersGetError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/api/v1/barbers',
        ...options
    });
};

/**
 * Create Barber
 */
export const createBarberApiV1BarbersPost = <ThrowOnError extends boolean = false>(options: Options<CreateBarberApiV1BarbersPostData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<CreateBarberApiV1BarbersPostResponse, CreateBarberApiV1BarbersPostError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/api/v1/barbers',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Get Barber By Id
 */
export const getBarberByIdApiV1BarbersBarberIdGet = <ThrowOnError extends boolean = false>(options: Options<GetBarberByIdApiV1BarbersBarberIdGetData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<GetBarberByIdApiV1BarbersBarberIdGetResponse, GetBarberByIdApiV1BarbersBarberIdGetError, ThrowOnError>({
        url: '/api/v1/barbers/{barber_id}',
        ...options
    });
};

/**
 * Get All Services
 */
export const getAllServicesApiV1ServicesGet = <ThrowOnError extends boolean = false>(options?: Options<GetAllServicesApiV1ServicesGetData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<GetAllServicesApiV1ServicesGetResponse, GetAllServicesApiV1ServicesGetError, ThrowOnError>({
        url: '/api/v1/services',
        ...options
    });
};

/**
 * Create Service
 */
export const createServiceApiV1ServicesPost = <ThrowOnError extends boolean = false>(options: Options<CreateServiceApiV1ServicesPostData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<CreateServiceApiV1ServicesPostResponse, CreateServiceApiV1ServicesPostError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/api/v1/services',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Delete Service
 */
export const deleteServiceApiV1ServicesServiceIdDelete = <ThrowOnError extends boolean = false>(options: Options<DeleteServiceApiV1ServicesServiceIdDeleteData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).delete<DeleteServiceApiV1ServicesServiceIdDeleteResponse, DeleteServiceApiV1ServicesServiceIdDeleteError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/api/v1/services/{service_id}',
        ...options
    });
};

/**
 * Update Service
 */
export const updateServiceApiV1ServicesServiceIdPut = <ThrowOnError extends boolean = false>(options: Options<UpdateServiceApiV1ServicesServiceIdPutData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).put<UpdateServiceApiV1ServicesServiceIdPutResponse, UpdateServiceApiV1ServicesServiceIdPutError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/api/v1/services/{service_id}',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Get Schedules
 */
export const getSchedulesApiV1SchedulesGet = <ThrowOnError extends boolean = false>(options?: Options<GetSchedulesApiV1SchedulesGetData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<GetSchedulesApiV1SchedulesGetResponse, GetSchedulesApiV1SchedulesGetError, ThrowOnError>({
        url: '/api/v1/schedules',
        ...options
    });
};

/**
 * Create Schedule
 */
export const createScheduleApiV1SchedulesPost = <ThrowOnError extends boolean = false>(options: Options<CreateScheduleApiV1SchedulesPostData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<CreateScheduleApiV1SchedulesPostResponse, CreateScheduleApiV1SchedulesPostError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/api/v1/schedules',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Delete Schedule
 */
export const deleteScheduleApiV1SchedulesScheduleIdDelete = <ThrowOnError extends boolean = false>(options: Options<DeleteScheduleApiV1SchedulesScheduleIdDeleteData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).delete<DeleteScheduleApiV1SchedulesScheduleIdDeleteResponse, DeleteScheduleApiV1SchedulesScheduleIdDeleteError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/api/v1/schedules/{schedule_id}',
        ...options
    });
};

/**
 * Get Schedule
 */
export const getScheduleApiV1SchedulesScheduleIdGet = <ThrowOnError extends boolean = false>(options: Options<GetScheduleApiV1SchedulesScheduleIdGetData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<GetScheduleApiV1SchedulesScheduleIdGetResponse, GetScheduleApiV1SchedulesScheduleIdGetError, ThrowOnError>({
        url: '/api/v1/schedules/{schedule_id}',
        ...options
    });
};

/**
 * Update Schedule
 */
export const updateScheduleApiV1SchedulesScheduleIdPut = <ThrowOnError extends boolean = false>(options: Options<UpdateScheduleApiV1SchedulesScheduleIdPutData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).put<UpdateScheduleApiV1SchedulesScheduleIdPutResponse, UpdateScheduleApiV1SchedulesScheduleIdPutError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/api/v1/schedules/{schedule_id}',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Get Appointments
 */
export const getAppointmentsApiV1AppointmentsGet = <ThrowOnError extends boolean = false>(options?: Options<GetAppointmentsApiV1AppointmentsGetData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<GetAppointmentsApiV1AppointmentsGetResponse, GetAppointmentsApiV1AppointmentsGetError, ThrowOnError>({
        url: '/api/v1/appointments',
        ...options
    });
};

/**
 * Create Appointment
 */
export const createAppointmentApiV1AppointmentsPost = <ThrowOnError extends boolean = false>(options: Options<CreateAppointmentApiV1AppointmentsPostData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<CreateAppointmentApiV1AppointmentsPostResponse, CreateAppointmentApiV1AppointmentsPostError, ThrowOnError>({
        url: '/api/v1/appointments',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Delete Appointment
 */
export const deleteAppointmentApiV1AppointmentsAppointmentIdDelete = <ThrowOnError extends boolean = false>(options: Options<DeleteAppointmentApiV1AppointmentsAppointmentIdDeleteData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).delete<DeleteAppointmentApiV1AppointmentsAppointmentIdDeleteResponse, DeleteAppointmentApiV1AppointmentsAppointmentIdDeleteError, ThrowOnError>({
        url: '/api/v1/appointments/{appointment_id}',
        ...options
    });
};

/**
 * Get Appointment
 */
export const getAppointmentApiV1AppointmentsAppointmentIdGet = <ThrowOnError extends boolean = false>(options: Options<GetAppointmentApiV1AppointmentsAppointmentIdGetData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<GetAppointmentApiV1AppointmentsAppointmentIdGetResponse, GetAppointmentApiV1AppointmentsAppointmentIdGetError, ThrowOnError>({
        url: '/api/v1/appointments/{appointment_id}',
        ...options
    });
};

/**
 * Update Appointment
 */
export const updateAppointmentApiV1AppointmentsAppointmentIdPut = <ThrowOnError extends boolean = false>(options: Options<UpdateAppointmentApiV1AppointmentsAppointmentIdPutData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).put<UpdateAppointmentApiV1AppointmentsAppointmentIdPutResponse, UpdateAppointmentApiV1AppointmentsAppointmentIdPutError, ThrowOnError>({
        url: '/api/v1/appointments/{appointment_id}',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Create Thread
 */
export const createThreadApiV1ThreadsPost = <ThrowOnError extends boolean = false>(options: Options<CreateThreadApiV1ThreadsPostData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<CreateThreadApiV1ThreadsPostResponse, CreateThreadApiV1ThreadsPostError, ThrowOnError>({
        url: '/api/v1/threads',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Get Threads By User Id
 */
export const getThreadsByUserIdApiV1ThreadsLoggedUserIdAndOtherUserIdGet = <ThrowOnError extends boolean = false>(options: Options<GetThreadsByUserIdApiV1ThreadsLoggedUserIdAndOtherUserIdGetData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<GetThreadsByUserIdApiV1ThreadsLoggedUserIdAndOtherUserIdGetResponse, GetThreadsByUserIdApiV1ThreadsLoggedUserIdAndOtherUserIdGetError, ThrowOnError>({
        url: '/api/v1/threads/{logged_user_id}/and/{other_user_id}',
        ...options
    });
};

/**
 * Get All Threads By User Id
 */
export const getAllThreadsByUserIdApiV1ThreadsUserIdGet = <ThrowOnError extends boolean = false>(options: Options<GetAllThreadsByUserIdApiV1ThreadsUserIdGetData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<GetAllThreadsByUserIdApiV1ThreadsUserIdGetResponse, GetAllThreadsByUserIdApiV1ThreadsUserIdGetError, ThrowOnError>({
        url: '/api/v1/threads/{user_id}',
        ...options
    });
};

/**
 * Create Message
 */
export const createMessageApiV1MessagesPost = <ThrowOnError extends boolean = false>(options: Options<CreateMessageApiV1MessagesPostData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<CreateMessageApiV1MessagesPostResponse, CreateMessageApiV1MessagesPostError, ThrowOnError>({
        url: '/api/v1/messages',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Update Hasactivemessage Boolean
 */
export const updateHasActiveMessageBooleanApiV1MessagesMessageIdPut = <ThrowOnError extends boolean = false>(options: Options<UpdateHasActiveMessageBooleanApiV1MessagesMessageIdPutData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).put<UpdateHasActiveMessageBooleanApiV1MessagesMessageIdPutResponse, UpdateHasActiveMessageBooleanApiV1MessagesMessageIdPutError, ThrowOnError>({
        url: '/api/v1/messages/{message_id}',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Root
 */
export const rootGet = <ThrowOnError extends boolean = false>(options?: Options<RootGetData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<unknown, unknown, ThrowOnError>({
        url: '/',
        ...options
    });
};

/**
 * Root
 */
export const rootHealthzGet = <ThrowOnError extends boolean = false>(options?: Options<RootHealthzGetData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<unknown, unknown, ThrowOnError>({
        url: '/healthz',
        ...options
    });
};