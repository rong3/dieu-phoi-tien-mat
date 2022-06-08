import React, { useEffect, useState } from "react";
import { getUserDetails } from "../../../services";
import { authenticationConstant } from "../globalConstant/authenticationConstant"
import { CookieHelper } from "../utils/cookie"
import { TYPELAYOUT } from "../globalConstant/common"
import { masterConfig } from "../../../config/master"
import { loginGateway } from "../../../services/dptm/auth"

export function useProvideAuth(props) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('user')) {
            const data = JSON.parse(localStorage.getItem('user'));
            setUser({ ...data })
        }
        else setUser(null);
    }, [])

    const checkTokenMiddleWare = () => {
        if (masterConfig.type === TYPELAYOUT.WEB_APP) {
            const token = CookieHelper.getCookie(authenticationConstant.tokenKey);
            if (token) {
                setUser(null);
                return true
            }
            else {
                setUser([]);
                return false
            }
        }
        else {
            setUser(null);
            return true;
        }
    }

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return checkTokenMiddleWare();
    });


    // signin method: It can either return a promise or execute a callback function.
    // You can prefer to keep this in userServices.js
    const signin = (credentials) => {
        console.log("SS:: PrivateRoute > useProviderAuth > signin() called...");
        return new Promise((resolve, reject) => {
            try {
                // setUser({
                //     id: "",
                //     userName: "",
                //     email: "",
                //     roles: ""
                // });
                // CookieHelper.setCookie(authenticationConstant.tokenKey, Math.random());
                // setIsAuthenticated(true)
                // resolve();

                loginGateway(credentials).then((res) => {
                    if (res?.data) {
                        const data = res?.data;
                        const accessToken = data?.token;
                        CookieHelper.setCookie(authenticationConstant.tokenKey, accessToken);
                        setUser({ ...data });
                        if (data) {
                            delete data?.token;
                            localStorage.setItem("user", JSON.stringify(data))
                        }
                        setIsAuthenticated(true)
                        resolve(res);
                    }
                    else {
                        localStorage.removeItem('user')
                        setUser([]);
                        setIsAuthenticated(false)
                        reject(res?.message);
                    }
                })
            } catch (error) {
                console.error("signin error!==", error);
                setIsAuthenticated(false);
                localStorage.removeItem('user');
                reject("signin error!");
            }
        });
    };
    const signout = () => {
        return new Promise((resolve, reject) => {
            try {
                // do API endpoint axios call here and return the promise.
                setUser(null);
                setIsAuthenticated(false)
                CookieHelper.removeCookie(authenticationConstant.tokenKey);
                resolve(true);
            } catch (error) {
                console.error("signout error!==", error);
                reject("signout error!");
            }
        });
    };

    return {
        user,
        isAuthenticated,
        signin,
        signout,
    };
}
