<template>
    <v-card class="p-3">
        <table>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 160px">Name</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">{{ data.first_name }}  {{ data.last_name }}</td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 160px">Screen Name</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">{{ data.screen_name }}</td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 160px">Gender</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">{{  personal.per_gender == 0 ? 'Female' : 'Male'}}</td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 160px">Age</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">{{ getAge(personal.dob) }}</td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Height</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">{{ personal.per_height }}</td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Employment Status</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">{{ personal.per_employment_status }}</td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Occupation</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">{{ essential.per_occupation }}</td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Education</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">{{ essential.per_education_level }}</td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Religion</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">{{ essential.per_religion }}</td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Ethnicity</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">{{ personal.per_ethnicity }}</td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Mother Tongue</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">{{personal.per_mother_tongue}}</td>
            </tr>
            <tr>
            <td class="text--disabled text-subtitle-1" style="width: 50px">Nationality</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">
                    {{
                        $store.state.candidateInfo.countries[
                            personal.per_nationality
                        ]
                        ? $store.state.candidateInfo.countries[
                           personal.per_nationality
                        ].name
                        : ""
                    }}
                </td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Country of Birth</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">
                    {{
                        $store.state.candidateInfo.countries[
                            personal.per_country_of_birth
                        ]
                        ? $store.state.candidateInfo.countries[
                            personal.per_country_of_birth
                        ].name
                        : ""
                    }}
                </td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Current Residence</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">
                    {{
                        $store.state.candidateInfo.countries[
                            personal.per_current_residence
                        ]
                            ? $store.state.candidateInfo.countries[
                                personal.per_current_residence
                            ].name
                            : ""
                        }}
                </td>
            </tr>
             <tr>
                <td class="text--disabled text-subtitle-1" style="width: 160px">Willing to Relocate</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">{{ personal.per_willing_to_relocate == 1 ? 'Yes' : 'No' }}</td>
            </tr>
           <!-- <tr>
                <td class="text--disabled text-subtitle-1" style="width: 160px">Mobile No</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1"></td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 160px">Email</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1"></td>
            </tr> -->
            
            <!-- <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Age</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">{{personal.per_age}}</td>
            </tr> -->
        </table>
    </v-card>
</template>

<script>
export default {
    name:'PersonalInfoTable',
    props: {
        data: {
            type: Object
        }
    },
    computed: {
        personal() {
            return this.data?.personal ? this.data.personal : {}
        },
        essential() {
            return this.data?.essential  ? this.data.essential    : {}
        },
    },
    methods: {
        getAge(dateString) {
            var now = new Date();
            // var today = new Date(now.getYear(),now.getMonth(),now.getDate());

            var yearNow = now.getYear();
            var monthNow = now.getMonth();
            var dateNow = now.getDate();

            var dob = new Date(dateString);

            var yearDob = dob.getYear();
            var monthDob = dob.getMonth();
            var dateDob = dob.getDate();
            var age = {};
            var ageString = "";
            var yearString = "";
            var monthString = "";
            var dayString = "";


            let yearAge = yearNow - yearDob;

            if (monthNow >= monthDob)
                var monthAge = monthNow - monthDob;
            else {
                yearAge--;
                var monthAge = 12 + monthNow -monthDob;
            }

            if (dateNow >= dateDob)
                var dateAge = dateNow - dateDob;
            else {
                monthAge--;
                var dateAge = 31 + dateNow - dateDob;

                if (monthAge < 0) {
                monthAge = 11;
                yearAge--;
                }
            }

            age = {
                years: yearAge,
                months: monthAge,
                days: dateAge
            };

            if ( age.years > 1 ) yearString = " years";
            else yearString = " year";
            if ( age.months> 1 ) monthString = " months";
            else monthString = " month";
            if ( age.days > 1 ) dayString = " days";
            else dayString = " day";


            if ( (age.years > 0) && (age.months > 0) && (age.days > 0) )
                ageString = age.years + yearString + ", " + age.months + monthString;
            else if ( (age.years == 0) && (age.months == 0) && (age.days > 0) )
                ageString = "Only " + age.days + dayString + " old!";
            else if ( (age.years > 0) && (age.months == 0) && (age.days == 0) )
                ageString = age.years + yearString;
            else if ( (age.years > 0) && (age.months > 0) && (age.days == 0) )
                ageString = age.years + yearString + " and " + age.months + monthString;
            else if ( (age.years == 0) && (age.months > 0) && (age.days > 0) )
                ageString = age.months + monthString;
            else if ( (age.years > 0) && (age.months == 0) && (age.days > 0) )
                ageString = age.years + yearString;
            else if ( (age.years == 0) && (age.months > 0) && (age.days == 0) )
                ageString = age.months + monthString;
            else ageString = "--";

            return ageString;
        }
    }
}
</script>

<style scoped>
td {
    vertical-align: top;
}
</style>
