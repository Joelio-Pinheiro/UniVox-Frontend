import { AccountCircle, LockRounded, Mail, PhoneAndroid } from "@mui/icons-material";

export function IconSetter(name){
    switch(name){
        case "userName":
            return <AccountCircle sx={{ color: "#106FE2" }} />;
        case "email":
            return <Mail sx={{ color: "#106FE2" }} />;
        case "phone":
            return <PhoneAndroid sx={{ color: "#106FE2" }} />;
        case "password":
            return <LockRounded sx={{ color: "#106FE2" }} />;
        case "passwordConfirmation":
            return <LockRounded sx={{ color: "#106FE2" }} />;
        default:
            return <></>
    }
}