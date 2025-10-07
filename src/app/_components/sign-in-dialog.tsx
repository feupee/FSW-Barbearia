import { signIn } from "next-auth/react"
import { Button } from "./ui/button"
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import Image from "next/image"

const SignInDialog = () => {
  const handleLoginWithgoogleClick = () => signIn("google")

  return (
    <>
      <DialogHeader>
        <DialogTitle>Faça login na plataforma</DialogTitle>
        <DialogDescription>
          Conecte-se usando sua conta do Google
        </DialogDescription>
      </DialogHeader>
      <Button
        className="mt-4 w-full justify-center gap-2"
        variant="outline"
        onClick={handleLoginWithgoogleClick}
      >
        <Image
          alt="Fazer Login com Google"
          src="/Gooogle.png"
          height={18}
          width={18}
        />
        Google
      </Button>
      </>
  )
}

export default SignInDialog
