import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
export const loginValidator = [
    body("username").trim().isLength({ min: 3 }).withMessage("username is required"),
    body("password").trim().isLength({ min: 3 }).withMessage("Password should contain atleast 6 charecters"),
];
export const signupValidator = [
    ...loginValidator,
];
// export const chatCompletionValidator = [
//     body("message").notEmpty().withMessage("Message is required"),
// ];
//# sourceMappingURL=validator.js.map