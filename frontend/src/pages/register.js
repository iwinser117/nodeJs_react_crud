import React from "react";
import { Form, Input, Card, Button, CardHeader, CardBody, Select, SelectItem } from "@nextui-org/react";
import "../app/globals.css";
export default function App() {
    const [password, setPassword] = React.useState("");
    const [submitted, setSubmitted] = React.useState(null);
    const [errors, setErrors] = React.useState({});

    const getPasswordError = (value) => {
        if (value.length < 4) return "Password must be 4 characters or more";
        if (!/[A-Z]/.test(value)) return "Password needs at least 1 uppercase letter";
        if (!/[^a-zA-Z0-9]/.test(value)) return "Password needs at least 1 symbol";
        return null;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        const newErrors = {};

        const passwordError = getPasswordError(data.password);
        if (passwordError) newErrors.password = passwordError;

        if (data.name === "admin") newErrors.name = "Nice try! Choose a different username";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setSubmitted(data);
        // aqui invocar el endpoint ... pendiente integracion
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen ">

            <Card className="flex flex-col justify-center items-center gap-4 w-96 relative">
                <CardHeader className="flex gap-3 text-center">
                    <h2 className="text-2xl font-bold pb-2 text-center w-full">Nuevo Registro</h2>
                </CardHeader>

                <CardBody className="flex gap-4 items-center w-72 ">
                    <Form
                        className=" w-full justify-center items-center space-y-4 "
                        onSubmit={onSubmit}
                    >
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

                            <Select className="max-w-xs" label="Asigne Rol" placeholder="Seleccione Rol">
                                <SelectItem key={1}>Administrador</SelectItem>
                                <SelectItem key={1}>Empleado</SelectItem>
                            </Select>

                            {errors.terms && <span className="text-danger text-small">{errors.terms}</span>}

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