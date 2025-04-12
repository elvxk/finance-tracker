import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const BankAccountDel = ({ children, account }) => {
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/account`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete bank account");
      }

      toast.success("Bank account deleted successfully!");
      router.refresh();
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete bank account. Please try again.");
      router.refresh();
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="-mt-2 text-sm opacity-75 flex items-center gap-2 text-red-400 hover:cursor-pointer">
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            onClick={() => handleDelete(account.id)} // Ganti ke AlertDialogAction
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default BankAccountDel;
