import prisma from "@/lib/prisma";
import { ZodError, z } from "zod";
import { parseZodError } from "@/app/helpers";

export async function GET(request: Request) {
    try {
        const tasks = await prisma.task.findMany();
        return Response.json({ status: 200, tasks });
    } catch (error) {
        return Response.json({ status: 400, error });
    }
}

export async function POST(request: Request) {
    const data = await request.json();
    console.log(data);
    const taskSchema = z.object({
        taskTitle: z.string().min(1),
        taskDetails: z.string().min(1)
    });
    try {
        taskSchema.parse(data);
        await prisma.task.create({
            data: {
                title: data.taskTitle,
                details: data.taskDetails
            }
        })
        return Response.json({ message: "created!" });
    } catch (errors: any) {
        const parsedErrors = parseZodError(errors.issues);
        return Response.json({ errors: parsedErrors })
    }
}

export async function DELETE(request: Request) {
    const data = await request.json();
    const taskID = data.taskID;
    await prisma.task.delete({
        where:{
            id: taskID
        }
    });
    return Response.json({ });
}