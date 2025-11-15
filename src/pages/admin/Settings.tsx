import { usePortfolioStore } from "@/store/usePortfolioStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const settingsSchema = z.object({
  github: z.string().url("Must be a valid URL"),
  linkedin: z.string().url("Must be a valid URL"),
  email: z.string().email("Must be a valid email"),
  phone: z.string().min(1, "Phone is required"),
  location: z.string().min(1, "Location is required"),
  resumeUrl: z.string().url("Must be a valid URL"),
  photoUrl: z.string().url("Must be a valid URL"),
});

type SettingsForm = z.infer<typeof settingsSchema>;

export default function AdminSettings() {
  const { globalSettings, updateGlobalSettings } = usePortfolioStore();
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors } } = useForm<SettingsForm>({
    resolver: zodResolver(settingsSchema),
    defaultValues: globalSettings,
  });

  const onSubmit = (data: SettingsForm) => {
    updateGlobalSettings(data);
    toast({ title: "Settings updated successfully" });
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-4xl font-bold mb-2">Global Settings</h1>
        <p className="text-muted-foreground">Manage your contact information and social links</p>
      </div>

      <Card className="p-6 glass-strong border-border">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Social Links</h2>
            
            <div>
              <Label htmlFor="github">GitHub URL</Label>
              <Input id="github" {...register("github")} placeholder="https://github.com/username" />
              {errors.github && <p className="text-sm text-destructive mt-1">{errors.github.message}</p>}
            </div>

            <div>
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input id="linkedin" {...register("linkedin")} placeholder="https://linkedin.com/in/username" />
              {errors.linkedin && <p className="text-sm text-destructive mt-1">{errors.linkedin.message}</p>}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">Contact Information</h2>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} placeholder="your@email.com" />
              {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" {...register("phone")} placeholder="+1234567890" />
              {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" {...register("location")} placeholder="City, Country" />
              {errors.location && <p className="text-sm text-destructive mt-1">{errors.location.message}</p>}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">Assets</h2>
            
            <div>
              <Label htmlFor="resumeUrl">Resume URL (Google Drive or other)</Label>
              <Input id="resumeUrl" {...register("resumeUrl")} placeholder="https://drive.google.com/file/d/..." />
              {errors.resumeUrl && <p className="text-sm text-destructive mt-1">{errors.resumeUrl.message}</p>}
              <p className="text-xs text-muted-foreground mt-1">
                Upload your resume to Google Drive and get the shareable link
              </p>
            </div>

            <div>
              <Label htmlFor="photoUrl">Profile Photo URL</Label>
              <Input id="photoUrl" {...register("photoUrl")} placeholder="https://example.com/photo.jpg" />
              {errors.photoUrl && <p className="text-sm text-destructive mt-1">{errors.photoUrl.message}</p>}
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" size="lg">
              Save Settings
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
