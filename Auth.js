const Passport = require('passport') //Authentication
const LocalStratergy = require('passport-local').Strategy

const Person = require('./Models/Person');

Passport.use(new LocalStratergy(async (USERNAME, PASSWORD, done) => {
    try {
        console.log('Receved Credentials:', USERNAME, PASSWORD);
        const user = await Person.findOne({ username: USERNAME });
        if (!user) {
            console.log("hello");
            return done(null, false, { message: 'Incorrect Username' });
        }

        const isPasswordMatch =await user.comparePassword(PASSWORD);
        if (isPasswordMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect Password' });
        }
    }

    catch (e) {
        return done(e);
    }
}))

module.exports = Passport;
