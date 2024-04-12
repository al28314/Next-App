import axios from "axios";
import Head from "next/head";
import client from "@/services/axios";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useState } from "react";
import { LoginRequest } from "@/models/loginRequest";
import { stringify } from "querystring";
import { redirect } from "next/dist/server/api-utils";
import {useRouter} from "next/navigation";


export default function Login() {
    const [password, setPassword] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const router = useRouter();
    function Login() {
        const request = {
            username: username,
            password: password
        } as LoginRequest;
        client.post("/api/Users", JSON.stringify(request), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.data == true) {
                router.push("/")
            }
        })
    }

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Login</title>
            </Head>
            <h1 className="loginTitle">Login</h1>
            <div className="loginDiv">
                <InputText onChange={(e) => setUsername(e.target.value)} className="userName" placeholder="User Name"></InputText>
                <InputText onChange={(e) => setPassword(e.target.value)} className="password" placeholder="Password" type="password"></InputText>
                <Button onClick={Login} severity="success" className="loginBtn">Login</Button>
                <Button className="googleBtn" icon="pi pi-google" text raised></Button>
                <Button className="facebookBtn" icon="pi pi-facebook" text raised></Button>
            </div>
        </>
    )
}