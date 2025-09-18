import { z } from "zod";
const loginSchema = z.object({
    username: z.string(),
    password: z.string().min(4, "must have at least 4 charachters"),
});

export default loginSchema