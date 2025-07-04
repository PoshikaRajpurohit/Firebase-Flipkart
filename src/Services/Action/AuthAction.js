import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { auth } from "./../../Firebase"
    const signUpSuc = () => {
            return {
            type: "SIGN_UP_SUC",
            } }
    export const signINSuc = (user) => ({
            type: "SIGN_IN_SUC",
            payload: user,
            });
    const signOUTSUC = () => {
            return {
            type: "SIGN_OUT_SUC",
            }}
    const errorMsg = (err) => {
        return {
        type: "ERROR",
        payload: err
        }}
    export const signUpAsync = (data) => {
        return async (dispatch) => {
            try {
            let userCred = await createUserWithEmailAndPassword(auth, data.email, data.password)
            if(userCred.user){
                dispatch(signUpSuc());
            }
         } catch (error) {
            console.log(error);
            dispatch(errorMsg(error.message));
            }
        }}


    export const signINAsync = (data) => {
        return async (dispatch) => {
            try {
            let userCred = await signInWithEmailAndPassword(auth, data.email, data.password)
            if(userCred.user){
                dispatch(signINSuc(userCred.user));
            }
        } catch (error) {
            console.log(error);
            dispatch(errorMsg(error.message));
        }
        }}



    export const googleSignInAsync = () => {
        return async (dispatch) => {
            try {
           let authProvider = new GoogleAuthProvider();
           let userCred = await signInWithPopup(auth, authProvider)
            if(userCred.user){
                dispatch(signINSuc(userCred.user));
            }
            } catch (error) {
            console.log(error);
            dispatch(errorMsg(error.message));
            }
        }
    }


    export const signOutAsync = () => {
        return async (dispatch) => {
            try {
             await signOut(auth);
                dispatch(signOUTSUC());
            } catch (error) {
            console.log(error);
            dispatch(errorMsg(error.message));
            }
        }
    }

    export const setUserFromFirebase = (user) => {
        return (dispatch) => {
        dispatch(signINSuc(user));
        };
    
}
export const authCheckDone = () => ({
  type: "AUTH_CHECK_DONE",
});

