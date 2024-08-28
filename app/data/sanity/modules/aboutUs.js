import groq from "groq";
import {IMAGE} from '../image';

export const MODULE_ABOUT_US = groq`
    title,
    content,
    contentWidth,
    image {
        ${IMAGE}
    },
    "link": link[0] {
        title,
        url,
    },
`;