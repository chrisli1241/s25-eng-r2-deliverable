"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { createBrowserSupabaseClient } from "@/lib/client-utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteSpeciesDialog({ speciesId }: { speciesId: number }) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [isdeleting, setIsDeleting] = useState<boolean>(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase.from("species").delete().eq("id", speciesId);

    if (error) {
      toast({
        title: "Error deleting species data",
        description: error.message,
        variant: "destructive",
      });
      setIsDeleting(false);
      return;
    }
    setIsDeleting(false);
    setOpen(false);
    router.refresh();

    return toast({
      title: "Species deleted!",
      description: "Successfully deleted.",
    });
  };

  // Instantiate form functionality with React Hook Form, passing in the Zod schema (for validation) and default values
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-3 w-full bg-red-500">Delete Entry</Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Delete Species</DialogTitle>
          <DialogDescription>
            Are you sure you would like to delete this entry? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex">
          <Button
            type="submit"
            onClick={() => void handleDelete()}
            disabled={isdeleting}
            className="ml-1 mr-1 flex-auto bg-red-500"
          >
            Delete Entry
          </Button>
          <DialogClose asChild>
            <Button type="button" className="ml-1 mr-1 flex-auto" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
