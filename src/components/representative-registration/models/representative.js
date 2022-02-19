
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

export const VERIFICATION_RULES={
    ver_city:[{
        required: true,
        message: "Select city",
        trigger: "blur",
    }],
    ver_country:[{
        required: true,
        message: "Select country",
        trigger: "blur",
    }],
    ver_document_type:[{
        required: true,
        message: "Select document type",
        trigger: "blur",
    }],
    // ver_recommender_address:[{
    //     required: true,
    //     message: "Write your address",
    //     trigger: "blur",
    // }],
    // ver_recommender_first_name:[{
    //     required: true,
    //     message: "Write your first name",
    //     trigger: "blur",
    // }],
    // ver_recommender_last_name:[{
    //     required: true,
    //     message: "Write your last name",
    //     trigger: "blur",
    // }],
    // ver_recommender_mobile_no:[{
    //     required: true,
    //     message: "Write your mobile no",
    //     trigger: "blur",
    // }],
    // ver_recommender_occupation:[{
    //     required: true,
    //     message: "Select your occupation",
    //     trigger: "blur",
    // }],
    // ver_recommender_title:[{
    //     required: true,
    //     message: "Write your title",
    //     trigger: "blur",
    // }],
}
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