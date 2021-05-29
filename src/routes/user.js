const express = require('express')
const User = require('../models/User')
const router = new express.Router()
const auth = require('../middlewares/auth')
const {
 USER_POST_REGISTER,
 USER_POST_LOGIN, 
 USER_POST_UPDATE, 
 USER_POST_GOOGLE, 
 USER_POST_FACEBOOK
}  = require('./APIs')
const Logger = require('../config/logger')
const {
    validateLoginInput,
    validateRegisterInput,
    validateUpdateInput,
    updateUser,
    isUniqueEmail } = require('../utils/user')
const { setLang } = require('../languages/setLang');

const validator = require('validator')
const jwt = require('jsonwebtoken')
var geoip = require('geoip-lite');
const request = require('request');
var google = require('googleapis').google;
const { update } = require('../models/User')
const logger = require('../../client/src/config/logger/logger')
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2();



// @desc  Register new user
router.post(`/:lang${USER_POST_REGISTER}` , async (req, res) => {
    const messages = setLang(req.params.lang)
    const { errors, isValid } = validateRegisterInput(req.body, messages);

   // Check Validation inputs 
    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    //check if email is already exists 
    const email = req.body.email
    const isUnique = await isUniqueEmail("new", User, email, messages, null)
    if (!isUnique.isValid) {
        return res.status(400).json(isUnique.errors);
    }

    //create new user
    user = new User({
        methods: ['local'],
        name: req.body.name,
        local: {
            email: req.body.email,
            password: req.body.password
        }
    })

//save user
    try {
        await user.save()
        const tokens = await user.generateAuthToken()
        res.status(201).send({ user, token: tokens.token, refreshToken: tokens.refreshToken })

    } catch (error) {
        logger.error("userRegisterError: " + error)
        errors.registerError = messages.error
        res.status(400).json(errors);
    }
})




// @desc   user login
router.post(`/:lang${USER_POST_LOGIN}`, async (req, res) => {
    const messages = setLang(req.params.lang)
    const { errors, isValid } = validateLoginInput(req.body, messages);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const tokens = await user.generateAuthToken()

        res.status(200).send({ user, token: tokens.token, refreshToken: tokens.refreshToken })
    } catch (error) {
        
        errors.loginError = messages.error
        res.status(400).json(errors);
    }


})


/**
 * @description: update route
 * @param: update: name or email or password or phone
 */


router.patch('/api/:lang/user/:update', auth, async (req, res) => {
    const messages = setLang(req.params.lang)
    const update = req.params.update
    let resValidate = validateUpdateInput(req.params.update, req.body, messages);

    // Check Validation
    if (!resValidate.isValid) {
        return res.status(400).json(resValidate.errors);
    }

    try {

        let { errors, isValid, user } = await updateUser(User, update, req.user._id, req.body, messages)
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const tokens = await user.generateAuthToken()
        res.send({ user, token: tokens.token, refreshToken: tokens.refreshToken })

    } catch (error) {
        logger.error("userUpdateError")
        resValidate.errors.updateError = messages.error
        res.status(400).json(resValidate.errors);
    }


})


//fb auth
router.post('/api/:lang/user/fb', async (req, res) => {
    const messages = setLang(req.params.lang)
    let errors = {}
    request('https://graph.facebook.com/' + req.body.id + '?access_token=' + req.body.accessToken, { json: true }, async (error, response, body) => {

        if (!body.name || !body.id) {
            errors.error = body.error
            return res.status(400).json(errors);
        }


        const email = req.body.email
        const name = body.name
        const id = body.id
        try {

            let user = {}
            //login if already exist 
            user = await User.findOne({ "facebook.id": id })
            if (user) {
                const tokens = await user.generateAuthToken()
                return res.send({ user, token: tokens.token, refreshToken: tokens.refreshToken })
            }


            // Check if we have someone with the same email in local to merge Google id with local
            user = await User.findOne({ "local.email": email })
            if (user) {
                user.methods.push('Facebook')
                user.facebook = {
                    id: id,
                    email: email
                }
                await user.save()
                const tokens = await user.generateAuthToken()
                return res.send({ user, token: tokens.token, refreshToken: tokens.refreshToken })
            }

            //insert brand new users
            user = new User({
                name: name,
                methods: ['Facebook'],
                facebook: {
                    id: id,
                    email: email
                }
            })

            await user.save()
            const tokens = await user.generateAuthToken()
            return res.send({ user, token: tokens.token, refreshToken: tokens.refreshToken })

        } catch (error) {
            errors.error = messages.error
            res.status(400).json(errors);
        }

    });

})



//google auth
router.post('/api/:lang/user/google', async (req, res) => {
    const messages = setLang(req.params.lang)
    let errors = {}
    oauth2Client.setCredentials({
        access_token: req.body.access_token,
        // clientID: "746252017489-f5c1v2vlrlhum6vrl2epec0t74qccbvi.apps.googleusercontent.com",
        // clientSecret: 'FGf7UrLXHsGSmwugR52e2_NU',
    });
    var oauth2 = google.oauth2({
        auth: oauth2Client,
        version: 'v2'
    });

    try {
        oauth2.userinfo.get(
            async (err, resProfile) => {
                if (err) {
                    errors.error = messages.error
                    return res.status(400).json(errors);

                }

                const email = resProfile.data.email
                const name = resProfile.data.name
                const id = resProfile.data.id

                let user = {}
                //login if already exist 
                user = await User.findOne({ "google.id": id })
                if (user) {
                    const tokens = await user.generateAuthToken()
                    return res.send({ user, token: tokens.token, refreshToken: tokens.refreshToken })
                }


                // Check if we have someone with the same email in local to merge Google id with local
                user = await User.findOne({ "local.email": email })
                if (user) {
                    user.methods.push('Google')
                    user.google = {
                        id: id,
                        email: email
                    }
                    await user.save()
                    const tokens = await user.generateAuthToken()
                    return res.send({ user, token: tokens.token, refreshToken: tokens.refreshToken })
                }

                //insert brand new users
                user = new User({
                    name: name,
                    methods: ['Google'],
                    Google: {
                        id: id,
                        email: email
                    }
                })

                await user.save()
                const tokens = await user.generateAuthToken()
                return res.send({ user, token: tokens.token, refreshToken: tokens.refreshToken })


            });


    } catch (error) {
        errors.error = messages.error
        return res.status(400).json(errors);
    }


})



module.exports = router