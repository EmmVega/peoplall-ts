import { atom } from "recoil";

export const isLoggedInAtom = atom({
   key: "isLoggedIn", // unique ID (with respect to other atoms/selectors)
   default: false, // default value (aka initial value)
   uid: null,
});

export const uIdAtom = atom({
   key: "uIdToken",
   default: null,
});
