"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button, Card, CardHeader, CardBody } from "@nextui-org/react";
import { useAuth } from "../contexts/authContext";
import Link from "next/link";
import "../app/globals.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                // Llama al método `login` del contexto
                
                login(data.user, data.token);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || "Login failed. Please try again.");
            }
        } catch (error) {
            setErrorMessage("An unexpected error occurred. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="p-8 rounded-lg shadow-md w-96 gap-4">
                <CardHeader>
                    <div className="flex justify-between w-full items-center">
                        <Link href="/" className="absolute left-4 top-4">
                            <Button variant="light" color="primary">
                                ← Volver al Inicio
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold mb-2 text-center w-full">Login</h1>
                    </div>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <Input
                                clearable
                                underlined
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                clearable
                                underlined
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {errorMessage && (
                            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
                        )}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
}
