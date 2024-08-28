import groq from "groq";
import {IMAGE} from '../image';

export const MODULE_BANNER_GRID = groq`
    _key,
    itemsPerRow,
    bannerItems[] {
        _key,
        image {
            ${IMAGE}
        },
        "link": link[0] {
            title,
            url,
        },
    },
`;