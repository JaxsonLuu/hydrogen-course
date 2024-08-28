import groq from "groq";
import {IMAGE} from '../image';

export const MODULE_IMAGE_WITH_TEXT = groq`
    _key,
    title,
    content,
    textAlign,
    imagePosition,
    "link": link[0] {
        title,
        url,
    },
    image {
        ${IMAGE}
    }
`;