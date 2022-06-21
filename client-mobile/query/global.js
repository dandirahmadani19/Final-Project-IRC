import { makeVar } from "@apollo/client";

export let isLogin = makeVar(false);
export let access_token = makeVar("");
export let userProfile = makeVar({});
