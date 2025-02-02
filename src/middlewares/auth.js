

export const isLoggedIn = (req, res, next) => {
    if(req.headers.authorization){
        next(); 
    } else {
        res.redirect('/user/login'); 
    }
}

export const isLoggedOut = (req, res, next) => {
    if(req.headers.authorization){
        res.redirect('/user/current'); 
    } else {
        next(); 
    }
}