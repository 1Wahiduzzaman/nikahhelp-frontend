export const validateNumber = (rule, value, callback) => {
    if (!value) {
        callback();
    }
    var regex = /^[0-9]+$/;
    if (!regex.test(value)) {
        callback(
            new Error(
                "Please input 10 digit (only numerals 1-9)."
            )
        );
    } else {
        callback();
    }
}
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

export const VERIFICATION_RULES = {
    ver_city: [{
        required: true,
        message: "Select city",
        trigger: "blur",
    }],
    ver_country: [{
        required: true,
        message: "Select country",
        trigger: "blur",
    }],
    ver_document_type: [{
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
    ver_recommender_mobile_no: [
        
        { validator: validateNumber, trigger: "change" },
        { validator: validateNumber, trigger: "blur" },],
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
            message: "Select a country",
            trigger: "blur",
        },
    ],
    per_current_residence_city: [
        {
            required: true,
            message: "Select a city",
            trigger: "blur",
        },
    ],
    per_permanent_country: [
        {
            required: true,
            message: "Select permanent country",
            trigger: "blur",
        },
    ],
    per_permanent_city: [
        {
            required: true,
            message: "Select permanent city",
            trigger: "blur",
        },
    ],
    per_permanent_post_code: [
        {
            required: true,
            message: "Please provide a valid postcode",
            trigger: "blur",
        },
    ],
    per_permanent_address: [
        {
            required: true,
            message: "Enter your home address including country, city and post code",
            trigger: "blur",
        },
    ],
    mobile_number: [
        { validator: validateNumber, trigger: "change" },
        { validator: validateNumber, trigger: "blur" },
        {
            required: true,
            message: "Enter your mobile number",
            trigger: "blur",
        },


    ],


};

