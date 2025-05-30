/** @format */
"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	const { data: session } = useSession();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [role, setRole] = useState<"ADMIN" | "AGENT">("AGENT");
	const [signupRole, setSignupRole] = useState<"ADMIN" | "AGENT">("AGENT");
	const [loginError, setLoginError] = useState<string | null>(null);
	const [signupError, setSignupError] = useState<string | null>(null);
	const [signupSuccess, setSignupSuccess] = useState<string | null>(null);
	const router = useRouter();
	// Check if current user is admin
	// const isAdmin = session?.user?.role === "ADMIN";
	const isAdmin = true;

	const login = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoginError(null);

		const res = await signIn("credentials", {
			name,
			redirect: false,
			email,
			password,
			role,
		});

		if (res?.error) {
			setLoginError("Invalid email, password or role");
		} else if (res?.ok) {
			router.push("/dashboard");
		}
	};

	const signup = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSignupError(null);
		setSignupSuccess(null);

		if (password !== confirmPassword) {
			setSignupError("Passwords do not match");
			return;
		}

		if (password.length < 6) {
			setSignupError("Password must be at least 6 characters long");
			return;
		}

		try {
			const response = await fetch("/api/auth/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					email,
					password,
					role: signupRole,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				setSignupSuccess("User created successfully!");

				setName("");
				setEmail("");
				setPassword("");
				setConfirmPassword("");
				setSignupRole("AGENT");
			} else {
				setSignupError(data.error || "Failed to create user");
			}
		} catch (error) {
			setSignupError("Network error occurred");
		}
	};

	return (
		<div
			className={cn("flex flex-col gap-6 max-w-md mx-auto", className)}
			{...props}>
			<Card>
				<CardHeader>
					<CardTitle className='text-2xl'>Authentication</CardTitle>
					<CardDescription>
						Login to your account or create new users (Admin only)
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue='login' className='w-full'>
						<TabsList className='grid w-full grid-cols-2'>
							<TabsTrigger value='login'>Login</TabsTrigger>
							<TabsTrigger value='signup' disabled={!isAdmin}>
								Sign Up {!isAdmin && "(Admin Only)"}
							</TabsTrigger>
						</TabsList>

						<TabsContent value='login'>
							<form onSubmit={login}>
								<div className='flex flex-col gap-6'>
									<div className='grid gap-2'>
										<Label htmlFor='name'>Name</Label>
										<Input
											id='name'
											type='text'
											placeholder='test'
											value={name}
											onChange={(e) => setName(e.target.value)}
											required
										/>
									</div>
									<div className='grid gap-2'>
										<Label htmlFor='email'>Email</Label>
										<Input
											id='email'
											type='email'
											placeholder='m@example.com'
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											required
										/>
									</div>
									<div className='grid gap-2'>
										<Label htmlFor='password'>Password</Label>
										<Input
											id='password'
											type='password'
											required
											value={password}
											onChange={(e) => setPassword(e.target.value)}
										/>
									</div>
									<div className='grid gap-2'>
										<Label htmlFor='role'>Role</Label>
										<Select
											value={role}
											onValueChange={(value: "ADMIN" | "AGENT") =>
												setRole(value)
											}
										>
											<SelectTrigger className='w-full'>
												<SelectValue placeholder='Select role' />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectItem value='ADMIN'>ADMIN</SelectItem>
													<SelectItem value='AGENT'>AGENT</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</div>

									{loginError && (
										<p className='text-red-600 text-sm'>{loginError}</p>
									)}
									<Button type='submit' className='w-full cursor-pointer'>
										Login
									</Button>
								</div>
							</form>
						</TabsContent>

						<TabsContent value='signup'>
							{!isAdmin ? (
								<div className='text-center py-4'>
									<p className='text-muted-foreground'>
										Only administrators can create new user accounts.
									</p>
								</div>
							) : (
								<form onSubmit={signup}>
									<div className='flex flex-col gap-6'>
										<div className='grid gap-2'>
											<Label htmlFor='signup-name'>Name</Label>
											<Input
												id='signup-name'
												type='text'
												placeholder='m@example.com'
												value={name}
												onChange={(e) => setName(e.target.value)}
												required
											/>
										</div>
										<div className='grid gap-2'>
											<Label htmlFor='signup-email'>Email</Label>
											<Input
												id='signup-email'
												type='email'
												placeholder='test'
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												required
											/>
										</div>
										<div className='grid gap-2'>
											<Label htmlFor='signup-password'>Password</Label>
											<Input
												id='signup-password'
												type='password'
												required
												value={password}
												onChange={(e) => setPassword(e.target.value)}
											/>
										</div>
										<div className='grid gap-2'>
											<Label htmlFor='confirm-password'>Confirm Password</Label>
											<Input
												id='confirm-password'
												type='password'
												required
												value={confirmPassword}
												onChange={(e) => setConfirmPassword(e.target.value)}
											/>
										</div>
										<div className='grid gap-2'>
											<Label htmlFor='signup-role'>Role</Label>
											<Select
												value={signupRole}
												onValueChange={(value: "ADMIN" | "AGENT") =>
													setSignupRole(value)
												}>
												<SelectTrigger className='w-full'>
													<SelectValue placeholder='Select role' />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														<SelectItem value='ADMIN'>ADMIN</SelectItem>
														<SelectItem value='AGENT'>AGENT</SelectItem>
													</SelectGroup>
												</SelectContent>
											</Select>
										</div>

										{signupError && (
											<p className='text-red-600 text-sm'>{signupError}</p>
										)}
										{signupSuccess && (
											<p className='text-green-600 text-sm'>{signupSuccess}</p>
										)}
										<Button type='submit' className='w-full'>
											Create User
										</Button>
									</div>
								</form>
							)}
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
}
