export class User {
    companyName: string;
    email: string; 
    passcode: string;
    userType: string;
    city: string;
    state: string; 
    contactName: string;
    phoneNumber: string;
}

export class LoggedInUser {
    email: string; 
    type: string;
    token?: string;
}
