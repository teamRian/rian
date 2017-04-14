export default function(app, passport) {

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    
    app.get('/auth/facebook',
        passport.authenticate('facebook', { 
            callbackURL: 'facebook/callback', // facebook puts _-_ if no callback URL is defined
            scope : ['public_profile','email']
        })
    );

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback', (req, res, next)=>{
        console.log("FACEBOOK req.PATH :", req.path)
        passport.authenticate('facebook', (err, user, info)=> {
            if (err) { return next(err); }
            if (!user) { return res.redirect('/login'); }

            req.logIn(user, (err)=> {
              if (err) { return next(err); }
              console.log("REQ.SESSION.RETURNTO: ", req.session.returnTo);
              res.redirect(req.session.returnTo || '/me');
              delete req.session.returnTo;
            });
          })(req, res, next);
    });

    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

};
