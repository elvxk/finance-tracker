"use client";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AtSign, BadgeSwissFranc, Github } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center w-full items-center min-h-[calc(100vh-3rem)] gap-4">
      <SignIn.Root>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <>
              <SignIn.Step name="start">
                <Card className="mx-4 md:mx-0">
                  <CardHeader>
                    <div className="flex flex-col justify-center w-full items-center gap-4 my-2">
                      <BadgeSwissFranc className="w-15 h-15 md:w-25 md:h-25" />
                    </div>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                      Welcome back! Please sign in to continue
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
                                "Loading ..."
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
                </Card>
              </SignIn.Step>
            </>
          )}
        </Clerk.Loading>
      </SignIn.Root>
    </div>
  );
}
