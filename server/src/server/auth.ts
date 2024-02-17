import User from "@/models/User"
import app from "@/server.js"
import { compare } from "bcryptjs"
import session from "express-session"
import passport from "passport"
import { Strategy } from "passport-local"

app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true }),
)
app.use(passport.session())

passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username })
      if (!user) {
        return done(null, false, { message: "Incorrect username" })
      }
      const match = await compare(password, user.password)
      if (!match) {
        return done(null, false, { message: "Incorrect password" })
      }
      return done(null, user)
    } catch (error) {
      return done(error)
    }
  }),
)
passport.serializeUser((user, done) => {
  done(null, user._id)
})
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (error) {
    done(error)
  }
})

app.use(passport.initialize())
