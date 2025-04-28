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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { saveMeasureData } from "@/actions/handleMeasure";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  date: z.date({
    required_error: "A date of birth is required.",
  }),
  time: z.enum(["morning", "afternoon", "evening"]),
  temperature: z.string(),
  bloodPressSys: z.string(),
  bloodPressDia: z.string(),
  sugarLevel: z.string(),
  weight: z.string(),
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
      date: new Date(),
      time: "morning",
    },
  });

  function onSubmit(formData: z.infer<typeof FormSchema>) {
    if (userId) {
      (async () => {
        await saveMeasureData({ ...formData, id: uuidv4(), ownerId: userId });

        toast({ title: "New Measure data added.", duration: 2000 });

        navigate("/");
      })();
    }
  }

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
                            format(field.value, "PPP")
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
                        selected={field.value}
                        onSelect={field.onChange}
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="morning">Morning</SelectItem>
                      <SelectItem value="afternoon">Afternoon</SelectItem>
                      <SelectItem value="evening">Evening</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bloodPressSys"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Pressure-Systolic (mmHg) *</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bloodPressDia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Pressure-Diastolic (mmHg) *</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sugarLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sugar Level (mmol/L) *</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (Kg) *</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
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
