import { SignIn } from '@clerk/nextjs'

export const SignInView = () => {
  return <SignIn routing="path" path="/sign-in" />
}
