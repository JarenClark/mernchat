const formidable = require('formidable')
const validator = require('validator')
const registerModel = require('../models/authModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')

const path = require('node:path')

module.exports.userRegister = (req, res) => {

    const form = formidable();

    form.parse(req, async (err, fields, files) => {

        const { userName, email, password, passwordconfirm } = fields;
        const { avatar } = files;
        const errors = []

        // validation
        if (!userName) {
            errors.push('Please provide your user name')
        }
        if (!email) {
            errors.push('Please provide your email')
        }
        if (email && !validator.isEmail(email)) {
            errors.push('Please provide a valid email')
        }
        if (!password) {
            errors.push('Please provide a password')
        }
        if (!passwordconfirm) {
            errors.push('Please provide a password confirm')
        }
        if (password && passwordconfirm && password != passwordconfirm) {
            errors.push('Password and Password confirm  must match')
        }
        if (password && password.length < 6) {
            errors.push('Password must be at least 6 characters')
        }
        if (Object.keys(files).length == 0) {
            errors.push('Please provide an image')
        }
        // -- end validation



        // if error, throw error
        if (errors.length > 0) {
            res.status(400).json({
                error: {
                    errorMessage: errors
                }
            })
        } else {
            // attempt to make user 

            // random image name
            const getImageName = files.avatar.originalFilename
            const randNumb = Math.floor(Math.random() * 99999)
            const newImageName = randNumb + getImageName

            files.avatar.originalFilename = newImageName

            const newPath = __dirname + `/../../frontend/public/images/${files.avatar.originalFilename}`

            // console.log(`files == ${JSON.stringify(files)}`)
            // console.log(`
            // \n \n path is ${path.basename('mernchat')} 
            // \n \n filePath is ${files.avatar.filepath}
            // \n \n newPath is ${newPath} 
            // \n \n
            // `)



            try {
                // see if user already exists
                const checkUser = await registerModel.findOne({
                    email: email
                })

                //console.log(`CHECK USER == ${checkUser}`)
                if (checkUser) {
                    res.status(404).json({
                        error: {
                            errorMessage: ['Your Email already exists']
                        }
                    })
                } else {
                    fs.copyFile(files.avatar.filepath, newPath, async (error) => {
                        if (!error) {
                            //register
                            const userCreate = await registerModel.create({
                                userName,
                                email,
                                password: await bcrypt.hash(password, 10),
                                image: files.avatar.originalFilename
                            })

                            // token
                            const token = jwt.sign({
                                id: userCreate._id,
                                email: userCreate.email,
                                userName: userCreate.userName,
                                image: userCreate.image,
                                registerTime: userCreate.createdAt
                            }, process.env.SECRET, {
                                expiresIn: process.env.TOKEN_EXP
                            })

                            // 'Path': '/',
                            //  expires: new Date(Date.now() + (process.env.COOKIE_EXP * 24 * 60 * 60 * 1000)) 
                            // domain: process.env.FRONTEND_DOMAIN,
                            const options = {
                                sameSite: 'none',
                                secure: true,
                                httpOnly: true,
                                maxAge: process.env.COOKIE_EXP * 24 * 60 * 60 * 1000,

                            }

                            console.log(`options are ${JSON.stringify(options)}`)
                            res.status(201)
                                .cookie('authToken',
                                    token, options)
                                .send({successMessage: 'Succefully Registered', token})
                                
                            // console.log(`token is ${token} \n`)
                            // console.log('REGISTRATION COMPLETE SUCCESSFUL')
                        } else {
                            console.log(`userCreate error is ${error}`)
                            res.status(500).json({
                                error: {
                                    errorMessage: [`Internal Server Error: \n ${error}`]
                                }
                            })
                        }
                    })
                }

            } catch (error) {
                res.status(500).json({
                    error: {
                        errorMessage: ['Internal Server Error']
                    }
                })
            }

            // console.log(newImageName)

        }

    }) // end Formidable
}