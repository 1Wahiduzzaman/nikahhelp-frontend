
export const RULES = {

    per_gender: [
        {
            required: true,
            message: "Select your gender",
            trigger: "blur",
        },
    ],
    dob: [
        {
            required: true,
            message: "Select your date of birth",
            trigger: "blur",
        },
    ],
    per_occupation: [
        {
            required: true,
            message: "Select your occupation",
            trigger: "blur",
        },
    ],



};

export const RULES_PERSONAL = {

    per_current_residence_country: [
        {
            required: true,
            message: "Select your residence country",
            trigger: "blur",
        },
    ],
    per_permanent_country: [
        {
            required: true,
            message: "Select your permanant country",
            trigger: "blur",
        },
    ],
    per_permanent_post_code: [
        {
            required: true,
            message: "Write your post code",
            trigger: "blur",
        },
    ],
    per_permanent_address: [
        {
            required: true,
            message: "Write your address",
            trigger: "blur",
        },
    ],
    mobile_number: [
        {
            required: true,
            message: "Write your mobile number",
            trigger: "blur",
        },
    ],


};