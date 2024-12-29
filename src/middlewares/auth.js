

export const isLoggedIn = (req, res, next) => {
    if(req.cookies.tokenCookie){
        next(); 
    } else {
        res.redirect('/user/login'); 
    }
}

export const isLoggedOut = (req, res, next) => {
    if(req.cookies.tokenCookie){
        res.redirect('/user/current'); 
    } else {
        next(); 
    }
}