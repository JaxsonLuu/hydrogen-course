import groq from "groq";
import {IMAGE} from '../image';

export const MODULE_PARALLAX_BANNER = groq`
    title,
    content,
    height,
    image {
        ${IMAGE}
    },
    "link": link[0] {
        title,
        url,
    },
`;