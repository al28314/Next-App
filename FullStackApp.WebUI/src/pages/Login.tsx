import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";


export default function Login() {
    return (
        <>
            <div className="loginDiv">
                <h1 className="loginTitle">Login</h1>
                <InputText className="userName" placeholder="User Name"></InputText>
                <InputText className="password" placeholder="Password" type="password"></InputText>
                <Button severity="success" className="loginBtn">Login</Button>
                <Button className="googleBtn" icon="pi pi-google" text raised></Button>
                <Button className="facebookBtn" icon="pi pi-facebook" text raised></Button>
            </div>
        </>
    )
}