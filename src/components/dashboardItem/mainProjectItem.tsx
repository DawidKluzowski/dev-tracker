"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Progress, ProgressLabel, ProgressValue } from "../ui/progress";

interface MainProjectItemProps {
    id: string;
    name: string;
    description: string;
    tasks?: string[];
    containerClassName?: string;
}

function MainProjectItem({
    id,
    name,
    description,
    tasks,
    containerClassName,
}: MainProjectItemProps) {
    return (
        <Card className={containerClassName}>
            <CardHeader>
                <CardTitle>Your most recent project</CardTitle>
                <CardDescription>Keep track of your progress</CardDescription>
            </CardHeader>
            <CardContent className="w-full">
                <div className="flex w-full">
                    <div className="mb-4 flex flex-col w-1/2">
                        <h2 className="text-lg font-semibold">{name}</h2>
                        <p className="text-sm text-muted-foreground">
                            {description}
                        </p>
                    </div>
                    <MainProjectTasksList tasks={tasks || []} />
                </div>
                <Progress value={2} max={tasks?.length} className="mt-4">
                    <ProgressLabel>Upload progress</ProgressLabel>
                    <ProgressValue />
                </Progress>
            </CardContent>
        </Card>
    );
}

export default MainProjectItem;

function MainProjectTasksList({ tasks }: { tasks: string[] }) {
    return (
        <ul>
            {tasks.map((task, index) => (
                <li key={index}>{task}</li>
            ))}
        </ul>
    );
}
