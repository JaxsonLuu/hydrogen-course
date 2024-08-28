import groq from "groq";

export const MODULE_VIDEO_BACKGROUND = groq`
    _key,
    url,
    title,
    height,
    "link": link[0] {
        title,
        url,
    },
`;