export const InitRoute = (to, from, next) => {
    next();
    const user = JSON.parse(localStorage.getItem('user'));
    if (to.name == 'Signup') {
        return next({ name: 'Signup' });
    }
    else if (!user) {
        return next({ name: 'Login' });
    }
    else if (user.is_verified == 0) {
        return next({ name: 'EmailVerification' });
    }
    else if (user.account_type === 1 && user.data_input_status <= 5) {

        return next({ name: 'CandidateRegistration' });
    }
    else if (user.account_type === 2) {
        return next({ name: 'RepresentativeRegistration' });
    }
    else {
        next();
    }

}