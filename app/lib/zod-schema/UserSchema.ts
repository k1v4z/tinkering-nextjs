import { z } from "zod"

const UserSchema = z.object({
    email: z.string().email({ message: "Email không đúng định dạng" }),
    name: z.string()
        .min(8, { message: "Tên tối thiểu 8 ký tự" })
        .max(255, { message: "Tên tối đa 255 ký tự" })
})

const userValidateCheck = (userProps: any) => {
    const validateState = UserSchema.safeParse(userProps)
    return validateState;
}

export default userValidateCheck