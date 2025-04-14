import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginUserMutation } from "@/store/slices/authApi";
import { setCredentials } from "@/store/slices/authSlice";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
    const [login] = useLoginUserMutation();
  

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await login({ ...formData }).unwrap();


            dispatch(setCredentials({ token: result.token }));

            navigate("/dashboard");


        } catch (error: any) {
            const errors = error?.data?.errors;
            if (errors) {
                setFieldErrors(errors);
            } else {
                toast.error(error?.data?.message || "Something went wrong");
            }
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden">
                <CardContent className="grid p-0">
                    <form className="p-6 md:p-8" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Welcome Back 👋</h1>
                                <p className="text-balance text-muted-foreground">
                                    Please log in to continue. Access available for both Admin and Instructor roles.
                                </p>

                            </div>

                            {/* Email Field */}
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {fieldErrors.email && (
                                    <p className="text-xs text-red-500">{fieldErrors.email[0]}</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>

                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                {fieldErrors.password && (
                                    <p className="text-xs text-red-500">{fieldErrors.password[0]}</p>
                                )}
                            </div>

                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </div>
                    </form>
                    <p>For Admin Login </p>
                    <p>email-admin@gm.com</p>
                    <p>Password-123456 </p>
                </CardContent>
            </Card>

            <div className="text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                By clicking continue, you agree to our{" "}
                <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    );
}
