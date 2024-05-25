export interface IBookLiveClassData {
    name: string;
    phoneNumber: string;
    date: string;
    time: string; // Format should be HH:MM AM/PM
}

export interface IRequestACallData  {
    name: string;
    phoneNumber: string;
    message: string;
}