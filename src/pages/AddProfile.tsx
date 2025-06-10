import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { v4 as uuidv4 } from "uuid"

import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"

import { useToast } from "@/hooks/use-toast"
import MainLayout from "@/layout"
import { Button } from "@/components/ui/button"
import { saveProfile, UserProfile } from "@/actions/handleProfile"
import { useNavigate } from "react-router-dom"
import { SaveIcon } from "lucide-react"
import { useEffect } from "react"

const FormSchema = z.object({
  username: z.string(),
  age: z.string(),
  gender: z.enum(["male", "female"]),
})

export default function AddProfilePage() {
  const { toast } = useToast()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      gender: "male",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const newProfile: UserProfile = {
      id: uuidv4(),
      username: data.username,
      age: data.age,
      gender: data.gender,
    };

    (async () => {
      try {
        await saveProfile(newProfile)
        toast({
          title: "Added new profile successfully!",
        })
        navigate("/")
      } catch (error) {
        toast({
          title: "Something went wrong!",
          variant: "destructive",
        })
      }
    })()
  }

  return (
    <MainLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="px-4">
            <h2 className="mt-8 text-center text-2xl">Add New Profile</h2>

            <div className="mt-4 flex w-full max-w-sm flex-col gap-1.5">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-4 flex w-full max-w-sm flex-col gap-1.5">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Age" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-4 flex w-full max-w-sm flex-col gap-1.5">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="male" />
                          </FormControl>
                          <FormLabel className="font-normal">Male</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="female" />
                          </FormControl>
                          <FormLabel className="font-normal">Female</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="mt-8 w-full">
              <SaveIcon /> Save
            </Button>
          </div>
        </form>
      </Form>
    </MainLayout>
  )
}
