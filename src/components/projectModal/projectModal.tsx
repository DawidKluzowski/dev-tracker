import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogHeader,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    ProjectFormData,
    projectFormSchema,
} from "@/types/zodSchemas/projectFormSchema";
import { useAddProject } from "@/hooks/mutations/useAddProject";

// dodać tosty zeby zeby bylo wiadomo kiedy cos sie zadziało np (patch)

type ProjectModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

function ProjectModal({ isOpen, onClose }: ProjectModalProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProjectFormData>({
        resolver: zodResolver(projectFormSchema),
    });

    const mutation = useAddProject();

    const onSubmit: SubmitHandler<ProjectFormData> = async (data) => {
        // przekazac mutacje jako parametr zeby modal byl bardziej reuzywanly (?)
        mutation.mutate(data);
        onClose();
    };

    return (
        <Dialog open={isOpen}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent showCloseButton={false}>
                    <DialogHeader className="text-center">
                        <DialogTitle>New Project</DialogTitle>
                        <DialogDescription>
                            Please enter the name of your new project.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="ProjectName" className="sr-only">
                                Project Name
                            </Label>
                            <Input
                                {...register("projectName")}
                                placeholder="Project Name..."
                                id="ProjectName"
                            />
                            {errors.projectName && (
                                <span className="font-light text-red-600">
                                    This field is required
                                </span>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose
                            render={
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={onClose}
                                >
                                    Close
                                </Button>
                            }
                        />
                        <Button onClick={handleSubmit(onSubmit)} type="submit">
                            Create Project
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}

export default ProjectModal;
