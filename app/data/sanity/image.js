import groq from "groq";

export const IMAGE = groq`
    "altText": asset->altText,
    "url": asset->url,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height,
`;