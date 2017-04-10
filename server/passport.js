import { Strategy as FacebookStrategy } from "passport-facebook";
import User from "./models/User";
import config from "./config";
import firebase from 'firebase'
import moment from 'moment'
const facebookAuth = config.facebookAuth;

const firebaseConfig = {
    apiKey: "AIzaSyBX3jBV3-jGNqLwhSznY864MfPlp5H89Tw",
    authDomain: "riandev-d7a54.firebaseapp.com",
    databaseURL: "https://riandev-d7a54.firebaseio.com",
    storageBucket: "riandev-d7a54.appspot.com",
    messagingSenderId: "559609159517"  
}

firebase.initializeApp(firebaseConfig);
export default function(passport) {
	// used to serialize the user for the session
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});
	// attach req.session.passport.user = { // our serialised user object // }.


	// used to deserialize the user
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});
		
	// code for login (use('local-login', new LocalStategy))
	// code for signup (use('local-signup', new LocalStategy))

	// =========================================================================
	// FACEBOOK ================================================================
	// =========================================================================
	passport.use(new FacebookStrategy({
		// pull in our app id and secret from our auth.js file
		clientID        : facebookAuth.clientID,
		clientSecret    : facebookAuth.clientSecret,
		callbackURL     : facebookAuth.callbackURL,
		profileFields   : ["email","id", "first_name", "gender", "last_name", "picture"]
	},

		// facebook will send back the token and profile
	function(token, refreshToken, profile, done) {
		// asynchronous
		process.nextTick(function() {
		// find the user in the database based on their facebook id
		User.findOne({ "facebook_id" : profile.id }, function(err, user) {
			// if there is an error, stop everything and return that
			// if an error connecting to the database
			if (err) return done(err);
			// if the user is found, then log them in
			if (user) {
				console.log("USER FOUND: ", user);
				return done(null, user); // user found, return that user
			} else {
				// if there is no user found with that facebook id, create them
				var newUser = new User();
				
				// set all of the facebook information in our user model
				newUser.facebook_id = profile.id; // set the users facebook id                   
				newUser.token = token; // we will save the token that facebook provides to the user                    
				newUser.name = profile.name.givenName + " " + profile.name.familyName; // look at the passport user profile to see how names are returned
				newUser.email = profile.email || profile.emails[0].value || "null"; // facebook can return multiple emails so we'll take the first
				newUser.picture = profile.photos[0].value;
				// save our user to the database


				newUser.save(function(err) {
					if (err) throw err;
					// if successful, return the new user]
					//find mongooseid to make firebase users profile ID
						
					//make personal notes Database in Firebase
					console.log("in")

					//After making profile in MongoDB, will make Note Database in firebase
					const userid = newUser._id.toString()
					// const offsetRef = firebase.database().ref(".info/serverTimeOffset");
				
					// offsetRef.on("value", function(snap) {
					// 	var offset = snap.val();
						var timestamp = moment().unix()	  
						const noteUpdate = {}
		      			noteUpdate.share= {}
		      			noteUpdate.share[userid] = true

			      		//make First Note
			      		const newNotePush = firebase.database().ref('notes/' + userid + '/' + 'note').push().key
			      		
			      		
			      		firebase.database().ref('notes/' + userid + '/' + 'note' + '/' + newNotePush)
			      			.set(noteUpdate)
			      			.then(()=>{
			      			  
			      			   var newInforkey = firebase.database().ref('notes/' + userid + '/' + 'infor').push().key 	
			      			   const inforUpdate = {}
			      			   inforUpdate.title = "Rian에 오신 것을 환영합니다."
							   inforUpdate.created_at = timestamp
							   inforUpdate.final_modified_at = timestamp
		     				   inforUpdate.snippet= "환영합니다."
		      				   inforUpdate.thumbnailUrl= ""
		      				   inforUpdate.share= {}
		      				   inforUpdate.share[userid] = true
		      				   console.log("HERE2") 
			      			   firebase.database().ref('notes/' + userid + '/' + 'infor' + '/' + newInforkey)
			      			       .set(inforUpdate)
			      			       .then(()=>{
			      			       										       console.log("Here123123")

			      			       	   const indexUpdate = {}
			      			       	   var newIndexkey = firebase.database().ref('notes/' + userid + '/' + 'index').push().key
			      			       	   indexUpdate.index_location = newIndexkey
					      			   indexUpdate.infor_location = newInforkey
									   indexUpdate.note_location = newNotePush
									   indexUpdate.created_at = timestamp
									   indexUpdate.final_modified_at = timestamp
									   indexUpdate.author = userid
									   indexUpdate.share = {}
									   indexUpdate.share[userid] = true
								       //make First Note's Timeline Instance
								       console.log("Here3")
					      			   firebase.database().ref('notes/' + userid + '/' + 'index' + '/' + newIndexkey)
					      			       .set(indexUpdate)    
					      			   return done(null, newUser);
			      			       })
			      			  
			      			})	

				//	});
			
				});

				//set users info to firebase	

			
			}

		});
	});

}));

}