"use client";

import React, { useState } from "react";
import { Form, Input, Card, Button, CardHeader, CardBody, Select, SelectItem } from "@nextui-org/react";
import { useAuth } from "../contexts/authContext";
import { useRouter } from "next/navigation";
import "../app/globals.css";
import Link from "next/link";

export default function App() {
    const { login } = useAuth();
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [role, setRole] = useState(null);
    const [submitted, setSubmitted] = useState(null);
    const [errors, setErrors] = useState({});

    const getPasswordError = (value) => {
        if (value.length < 8) return "La contraseña debe tener al menos 8 caracteres";
        if (!/[A-Z]/.test(value)) return "La contraseña necesita al menos 1 letra mayúscula";
        if (!/[a-z]/.test(value)) return "La contraseña necesita al menos 1 letra minúscula";
        if (!/[0-9]/.test(value)) return "La contraseña necesita al menos 1 número";
        if (!/[^a-zA-Z0-9]/.test(value)) return "La contraseña necesita al menos 1 símbolo";
        return null;
    };

    const handleSelectionChange = (e) => {
        // console.log(e.target)
        setRole(e.target.value)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        const newErrors = {};

        const passwordError = getPasswordError(data.password);
        if (passwordError) newErrors.password = passwordError;
        
        if (!data.role) newErrors.role = "Role is required";
        if (data.role === "employee" && (!data.salary || isNaN(data.salary))) {
            newErrors.salary = "Salary is required and must be a number for employees";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setSubmitted(data);

        // Aquí se haría la integración con el endpoint de registro
        try {

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();

                login(result.user, result.token);
            } else {
                throw new Error("Registration failed");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <Card className="flex flex-col justify-center items-center gap-4 w-96 relative">

                <div className="flex justify-between w-full items-center">
                    <Link href="/" className="absolute left-4 top-4">
                        <Button variant="light" color="primary">
                            ← Volver al Inicio
                        </Button>
                    </Link>
                </div>
                <CardHeader className="flex gap-3 text-center">
                    <h2 className="text-2xl font-bold pb-2 text-center w-full">Nuevo Registro</h2>
                </CardHeader>

                <CardBody className="flex gap-4 items-center w-72">
                    <Form className="w-full justify-center items-center space-y-4" onSubmit={onSubmit}>
                        <div className="flex flex-col gap-4 w-full">
                            <Input
                                isRequired
                                errorMessage={errors.name}
                                label="Name"
                                name="name"
                                placeholder="Enter your name"
                            />
                            <Input
                                isRequired
                                errorMessage={errors.email}
                                label="Email"
                                name="email"
                                placeholder="Enter your email"
                                type="email"
                            />
                            <Input
                                isRequired
                                errorMessage={getPasswordError(password)}
                                isInvalid={getPasswordError(password) !== null}
                                label="Password"
                                name="password"
                                placeholder="Enter your password"
                                type="password"
                                value={password}
                                onValueChange={setPassword}
                            />

                            <Select
                                className="max-w-xs"
                                label="Asigne Rol"
                                placeholder="Seleccione Rol"
                                value={role}
                                onChange={handleSelectionChange}
                                name="role"
                            >
                                <SelectItem key="administrator" value="administrator">Administrador</SelectItem>
                                <SelectItem key="employee" value="employee">Empleado</SelectItem>
                            </Select>
                            {errors.role && <span className="text-danger text-small">{errors.role}</span>}

                            {role === "employee" && (
                                <Input
                                    isRequired
                                    errorMessage={errors.salary}
                                    label="Salary"
                                    name="salary"
                                    placeholder="Enter your salary"
                                    type="number"
                                />
                            )}

                            <div className="flex gap-4">
                                <Button className="w-full" color="primary" type="submit">
                                    Submit
                                </Button>
                                <Button type="reset" variant="bordered">
                                    Reset
                                </Button>
                            </div>
                        </div>

                        {submitted && (
                            <div className="text-small text-default-500 mt-4">
                                Submitted data: <pre>{JSON.stringify(submitted, null, 2)}</pre>
                            </div>
                        )}
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}
