/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */
import React from "react";
import Layout from "./src/components/layout";

/**
 * provides props to elements contained under Layout component
 * possibly redundant, same content as gatsby-browser per suggestion in guide I followed 
 */
export const wrapPageElement = ({ element, props }) => {
    return <Layout {...props}>{element}</Layout>;
};
