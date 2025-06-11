import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/layout";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, SaveIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { v4 as uuidv4 } from "uuid";

import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { saveMeasureData } from "@/actions/handleMeasure";
import { Textarea } from "@/components/ui/textarea";

const isValidValue = (val: string | undefined, min: number, max: number) => {
  if (!val) return true;
  const num = parseFloat(val);
  return !isNaN(num) && num >= min && num <= max;
};

const FormSchema = z.object({
  date: z.string(),
  time: z.string(),
  temperature: z
    .string()
    .optional()
    .refine((val) => isValidValue(val, 30, 43), {
      message: "Unrealistic body temperature. Please double-check the value.",
    }),
  bloodPressSys: z
    .string()
    .optional()
    .refine((val) => isValidValue(val, 30, 200), {
      message: "Systolic blood pressure must be between 30 and 200 mmHg.",
    }),
  bloodPressDia: z
    .string()
    .optional()
    .refine((val) => isValidValue(val, 30, 200), {
      message: "Diastolic blood pressure must be between 30 and 200 mmHg.",
    }),
  sugarLevel: z
    .string()
    .optional()
    .refine((val) => isValidValue(val, 1.5, 35), {
      message: "Sugar level must be between 1.5 and 35 mmol/L.",
    }),
  weight: z
    .string()
    .optional()
    .refine((val) => isValidValue(val, 3, 300), {
      message: "Weight must be between 3 and 300 Kg.",
    }),
  comment: z.string().optional(),
});

export type MeasureInfo = z.infer<typeof FormSchema> & {
  id: string;
  ownerId: string;
};

const userId = localStorage.getItem("profileId");

export default function AddMeasurePage() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: new Date().toISOString().slice(0, 10),
      time: new Date().toTimeString().split(" ")[0],
    },
  });

  function onSubmit(formData: z.infer<typeof FormSchema>) {
    if (userId) {
      (async () => {
        console.log({ userId });
        await saveMeasureData({ ...formData, id: uuidv4(), ownerId: userId });

        toast({ title: "New Measure data added.", duration: 2000 });

        navigate("/");
      })();
    }
  }

  useEffect(() => {
    if (
      form.formState.errors &&
      Object.keys(form.formState.errors).length > 0
    ) {
      console.error("Form errors:", form.formState.errors);
    }
  }, [form.formState.errors]);

  return (
    <MainLayout>
      <div className="px-4">
        <h1 className="mb-6 text-xl">Add New Measure</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) =>
                          field.onChange(
                            date ? date.toISOString().slice(0, 10) : "",
                          )
                        }
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <Input
                    type="time"
                    step="1"
                    {...field}
                    className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="temperature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body Temperature (°C)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bloodPressSys"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Pressure-Systolic (mmHg)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bloodPressDia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Pressure-Diastolic (mmHg)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sugarLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sugar Level (mmol/L)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (Kg)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Leave your comment here..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex w-full justify-end gap-2">
              <Button variant="outline" onClick={() => navigate("/")}>
                Cancel
              </Button>
              <Button type="submit">
                <SaveIcon />
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </MainLayout>
  );
}
