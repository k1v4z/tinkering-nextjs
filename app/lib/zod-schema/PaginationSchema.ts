import {z} from "zod"

const PaginationSchema = z.object({
    limit: z.number().positive({message: "Limit must be greater than 0"}),
    page: z.number().positive({ message: "Page must be greater than 0" })
})

const searchParamsValidate = (searchPrams: any) => {
    const validateState = PaginationSchema.safeParse(searchPrams)
    console.log("Prams: >>>>>>> ", typeof searchPrams.limit)
    return validateState
}

export default searchParamsValidate