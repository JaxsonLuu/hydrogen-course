import groq from 'groq';
import {MODULE_IMAGE_WITH_TEXT} from './modules/imageWithText';
import {MODULE_VIDEO_BACKGROUND} from './modules/videoBackground';
import {MODULE_BANNER_GRID} from './modules/bannerGrid';
import {MODULE_SELECTED_PRODUCTS} from './modules/selectedProducts';
import {MODULE_PARALLAX_BANNER} from './modules/parallaxBanner';
import {MODULE_ABOUT_US} from './modules/aboutUs';

export const MODULES = groq`
    _key,
    _type,
    (_type == "imageWithText") => {
        ${MODULE_IMAGE_WITH_TEXT}
    },
    (_type == "videoBackground") => {
        ${MODULE_VIDEO_BACKGROUND}
    },
    (_type == "bannerGrid") => {
        ${MODULE_BANNER_GRID}
    },
    (_type == "selectedProducts") => {
        ${MODULE_SELECTED_PRODUCTS}
    },
    (_type == "parallaxBanner") => {
        ${MODULE_PARALLAX_BANNER}
    },
    (_type == "aboutUs") => {
        ${MODULE_ABOUT_US}
    }
`;