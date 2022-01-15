export const InitRoute = (to, from, next) => {
    next();
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user && to.name == 'Signup') {
        return next();
    }
    /**please explain how this home route works 
     * You can only navigate to home page If you aren't logged in.
    */
    else if (!user && to.name == 'Home') {
        return next();
    }
    else if (!user) {
        return to.name == 'Login' ? next() : next({ name: 'Login' });
    }
    else if (user.is_verified == 0) {
        return to.name == 'EmailVerification' ? next() : next({ name: 'EmailVerification' });
    }
    else if (user.account_type === 1 && user.data_input_status <= 4) {

        return to.name == 'CandidateRegistration' ? next() : next({ name: 'CandidateRegistration' });
    }
    else if (user.account_type === 1 && user.data_input_status > 4 && to.name === 'CandidateRegistration') {

        return next({ name: 'root' });
    }
    else if (user.account_type === 2 && user.data_input_status <= 2) {
        return to.name == 'RepresentativeRegistration' ? next() : next({ name: 'RepresentativeRegistration' });
    }
    else if (user.account_type === 2 && user.data_input_status > 2 && to.name === 'RepresentativeRegistration') {
        return next({ name: 'root' });
    }
    else if (user && (to.name == 'Signup' || to.name == 'Login' || user && to.name == 'Home')) {
        return to.name == 'root' ? next() : next({ name: 'root' });
    }
    else {
        next();
    }

}

export function lazyLoadView(folderName, view) {
    return () => import(`@/views/${folderName}/${view}.vue`)
}
export function lazyLoadComponent(folderName, component) {
    return () => import(`@/components/${folderName}/${component}.vue`)
}