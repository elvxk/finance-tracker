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
import { BadgeSwissFranc } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

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
                    <CardTitle>Login to Finance Tracker</CardTitle>
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
                                  <GithubSolid />
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
                                  <GoogleSolid />
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
      <div id="clerk-captcha" />
      <ModeToggle />
    </div>
  );
}

export function GoogleSolid(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12.037 21.998a10.3 10.3 0 0 1-7.168-3.049a9.9 9.9 0 0 1-2.868-7.118a9.95 9.95 0 0 1 3.064-6.949A10.37 10.37 0 0 1 12.212 2h.176a9.94 9.94 0 0 1 6.614 2.564L16.457 6.88a6.2 6.2 0 0 0-4.131-1.566a6.9 6.9 0 0 0-4.794 1.913a6.62 6.62 0 0 0-2.045 4.657a6.6 6.6 0 0 0 1.882 4.723a6.9 6.9 0 0 0 4.725 2.07h.143c1.41.072 2.8-.354 3.917-1.2a5.77 5.77 0 0 0 2.172-3.41l.043-.117H12.22v-3.41h9.678q.113.927.1 1.859c-.099 5.741-4.017 9.6-9.746 9.6l-.215-.002Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export function GithubSolid(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12.006 2a9.85 9.85 0 0 0-6.484 2.44a10.32 10.32 0 0 0-3.393 6.17a10.48 10.48 0 0 0 1.317 6.955a10.05 10.05 0 0 0 5.4 4.418c.504.095.683-.223.683-.494c0-.245-.01-1.052-.014-1.908c-2.78.62-3.366-1.21-3.366-1.21a2.7 2.7 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621c.317.044.62.163.885.346c.266.183.487.426.647.71c.135.253.318.476.538.655a2.08 2.08 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37c-2.219-.259-4.554-1.138-4.554-5.07a4.02 4.02 0 0 1 1.031-2.75a3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05c.37.858.406 1.828.101 2.713a4.02 4.02 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.47 2.47 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814c0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421a10.47 10.47 0 0 0 1.313-6.948a10.32 10.32 0 0 0-3.39-6.165A9.85 9.85 0 0 0 12.007 2Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
