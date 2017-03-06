const config = {
	mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/rian',
	port: process.env.PORT || 8000,
	facebookAuth : {
	    'clientID'      : '183216738826974', // your App ID
	    'clientSecret'  : '8b227a26867fdc7ce8cc43f6a989733f', // your App Secret
	    'callbackURL'   : "http://localhost:8000/auth/facebook/callback"
	}
    // 'twitterAuth' : {
    //     'consumerKey'       : 'your-consumer-key-here',
    //     'consumerSecret'    : 'your-client-secret-here',
    //     'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    // },

    // 'googleAuth' : {
    //     'clientID'      : 'your-secret-clientID-here',
    //     'clientSecret'  : 'your-client-secret-here',
    //     'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    // }
};

export default config;
