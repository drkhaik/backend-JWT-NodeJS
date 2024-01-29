import Express from "express";
import passport from "passport";
import { checkAdminPermission } from '../middleware/JWTAction';
import userController from '../controllers/userController';

const router = Express.Router();

router.post('/login', userController.handleLogin);
router.get('/fetch-account', userController.fetchAccount);
router.post('/logout', userController.handleLogout);

router.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"],
    hd: 'uef.edu.vn',
    prompt: 'select_account',
}));

router.get("/auth/google/callback", passport.authenticate("google", {
    failureMessage: "Cannot login to Google, please try again later!",
    failureRedirect: `${process.env.URL_FRONTEND}/login/error`,
    successRedirect: `${process.env.URL_FRONTEND}/login/success`,
}),
    (req, res) => {
        console.log("User: ", req.user);
        res.send("Thank you for signing in!");
    }
);

router.get('/auth/student', userController.handleGoogleLogin);
router.get('/auth/department', userController.handleGoogleLoginDepartment);

router.get('/users', checkAdminPermission, userController.fetchAllUser);
router.get('/user/:id', checkAdminPermission, userController.fetchUser);
router.post('/user', userController.createNewUser);
router.put('/user', userController.updateUser);
router.put('/user/change-password', userController.changeUserPassword);
router.delete('/user/:id', checkAdminPermission, userController.deleteUser);
router.put('/user/change-faculty', userController.changeFaculty);

router.get('/role', userController.getAllRole);

router.get('/users/department/:id', userController.fetchDepartmentUser);

export default router;