import groq from "groq";

export const MODULE_SELECTED_PRODUCTS = groq`
    _key,
    title,
    description,
    limitItems,
    newProducts,
    productsInCollection,
    (productsInCollection) => {
        collection->{
            store{
                gid
            }
        }
    }
`;