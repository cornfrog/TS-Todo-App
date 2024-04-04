import { z } from "zod";

export function flatten(formData: FormData) {
    const enteredData = ["taskTitle", "taskDetails"];
    let newFormData: any = {};
    for (const data of enteredData) {
        newFormData[data] = formData.get(data);
    }
    return newFormData;
}

export function parseFormData(formData: any) {
    const formSchema = z.object({
        taskTitle: z.string().min(1),
        taskDetails: z.string().min(1)
    });
    return formSchema.parse(formData);
}

export function parseZodError(zodErrors: any[]){
    let errorMessages: any = {};
    zodErrors.forEach((zodError) => {
        const message = zodError.message.split(" ");
        message.shift();
        const messageString = message.join(" ");
        errorMessages[zodError.path[0]] = messageString;
    });
    return errorMessages;
}

