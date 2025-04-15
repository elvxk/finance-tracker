"use client";
import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AtSign, BadgeSwissFranc, Github } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="flex flex-col justify-center w-full items-center min-h-[calc(100vh-3rem)] gap-4">
      <SignUp.Root>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <>
              <SignUp.Step name="start">
                <Card className="mx-4 md:mx-0">
                  <CardHeader>
                    <div className="flex flex-col justify-center w-full items-center gap-4 my-2">
                      <BadgeSwissFranc className="w-15 h-15 md:w-25 md:h-25" />
                    </div>
                    <CardTitle>Login or Register</CardTitle>
                    <CardDescription>
                      Welcome! Please fill in the details to get started.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-x-4">
                      <Clerk.Connection name="github" asChild>
                        <Button disabled={isGlobalLoading}>
                          <Clerk.Loading scope="provider:github">
                            {(isLoading) =>
                              isLoading ? (
                                "Loading ..."
                              ) : (
                                <div className="flex items-center gap-2">
                                  <Github />
                                  GitHub
                                </div>
                              )
                            }
                          </Clerk.Loading>
                        </Button>
                      </Clerk.Connection>
                      <Clerk.Connection name="google" asChild>
                        <Button disabled={isGlobalLoading}>
                          <Clerk.Loading scope="provider:google">
                            {(isLoading) =>
                              isLoading ? (
                                "Loading..."
                              ) : (
                                <div className="flex items-center gap-2">
                                  <AtSign />
                                  Google
                                </div>
                              )
                            }
                          </Clerk.Loading>
                        </Button>
                      </Clerk.Connection>
                    </div>
                  </CardContent>
                  {/* <CardFooter> */}
                  {/*   <div className="grid w-full gap-y-4"> */}
                  {/*     <SignUp.Captcha className="empty:hidden" /> */}
                  {/*     <Button variant="link" size="sm" asChild> */}
                  {/*       <Clerk.Link navigate="login"> */}
                  {/*         Already have an account? Sign in */}
                  {/*       </Clerk.Link> */}
                  {/*     </Button> */}
                  {/*   </div> */}
                  {/* </CardFooter> */}
                </Card>
              </SignUp.Step>

              <SignUp.Step name="continue">
                <Card className="mx-4 md:mx-0">
                  <div className="flex flex-col justify-center w-full items-center gap-4 my-2">
                    <BadgeSwissFranc className="w-15 h-15 md:w-25 md:h-25" />
                  </div>

                  <CardHeader>
                    <CardTitle>Continue registration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Clerk.Field
                      name="username"
                      className="flex flex-col gap-2 space-y-2"
                    >
                      <Clerk.Label>
                        <Label>Username</Label>
                      </Clerk.Label>
                      <Clerk.Input type="text" required asChild>
                        <Input />
                      </Clerk.Input>
                      <Clerk.FieldError className="block text-sm text-destructive" />
                    </Clerk.Field>
                  </CardContent>
                  <CardFooter>
                    <div className="grid w-full gap-y-4">
                      <SignUp.Action submit asChild>
                        <Button disabled={isGlobalLoading}>
                          <Clerk.Loading>
                            {(isLoading) => {
                              return isLoading ? "Loading..." : "Continue";
                            }}
                          </Clerk.Loading>
                        </Button>
                      </SignUp.Action>
                    </div>
                  </CardFooter>
                </Card>
              </SignUp.Step>

              <SignUp.Step name="verifications">
                <SignUp.Strategy name="email_code">
                  <Card className="w-full sm:w-96">
                    <CardHeader>
                      <CardTitle>Verify your email</CardTitle>
                      <CardDescription>
                        Use the verification link sent to your email address
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-y-4">
                      <div className="grid items-center justify-center gap-y-2">
                        <Clerk.Field name="code" className="space-y-2">
                          <Clerk.Label className="sr-only">
                            Email address
                          </Clerk.Label>
                          <div className="flex justify-center text-center">
                            <Clerk.Input
                              type="otp"
                              className="flex justify-center has-[:disabled]:opacity-50"
                              autoSubmit
                              render={({ value, status }) => {
                                return (
                                  <div
                                    data-status={status}
                                    className={cn(
                                      "relative flex size-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
                                      {
                                        "z-10 ring-2 ring-ring ring-offset-background":
                                          status === "cursor" ||
                                          status === "selected",
                                      },
                                    )}
                                  >
                                    {value}
                                    {status === "cursor" && (
                                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                        <div className="animate-caret-blink h-4 w-px bg-foreground duration-1000" />
                                      </div>
                                    )}
                                  </div>
                                );
                              }}
                            />
                          </div>
                          <Clerk.FieldError className="block text-center text-sm text-destructive" />
                        </Clerk.Field>
                        <SignUp.Action
                          asChild
                          resend
                          className="text-muted-foreground"
                          fallback={({ resendableAfter }) => (
                            <Button variant="link" size="sm" disabled>
                              Didn&apos;t receive a code? Resend (
                              <span className="tabular-nums">
                                {resendableAfter}
                              </span>
                              )
                            </Button>
                          )}
                        >
                          <Button type="button" variant="link" size="sm">
                            Didn&apos;t receive a code? Resend
                          </Button>
                        </SignUp.Action>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="grid w-full gap-y-4">
                        <SignUp.Action submit asChild>
                          <Button disabled={isGlobalLoading}>
                            <Clerk.Loading>
                              {(isLoading) => {
                                return isLoading ? "Loading ..." : "Continue";
                              }}
                            </Clerk.Loading>
                          </Button>
                        </SignUp.Action>
                      </div>
                    </CardFooter>
                  </Card>
                </SignUp.Strategy>
              </SignUp.Step>
            </>
          )}
        </Clerk.Loading>
      </SignUp.Root>
      <div id="clerk-captcha" />
    </div>
  );
}
