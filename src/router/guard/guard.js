export const InitRoute = (to, from, next) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        next({ name: 'Login' });
    }
    else if (user.is_verified == 0) {
        next({ name: 'EmailVerification' });
    }
    else if (user.accoun_type === 1 && user.data_input_status <= 4) {

        next({ name: 'CandidateRegistration' });
    }
    else if (user.accoun_type === 2 && user.data_input_status == 3) {
        next({ name: 'RepresentativeRegistration' });
    }
    else {
        next();
    }

}