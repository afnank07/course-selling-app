import { atom } from 'recoil';

export const courseIdAtom = atom({
    key: "courseIdState",
    default: ""
})

export const courseTitleAtom = atom({
    key: "courseTitleState",
    default: ""
})

export const courseDescriptionAtom = atom({
    key: "courseDescriptionState",
    default: ""
})

export const coursePriceAtom = atom({
    key: "coursePriceState",
    default: ""
})

export const courseImageLinkAtom = atom({
    key: "courseImageLinkState",
    default: ""
})

export const coursePublishedAtom = atom({
    key: "coursePublishedState",
    default: ""
})
