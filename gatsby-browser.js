/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */
import React from "react";
import Layout from "./src/components/layout";

/* provides props to elements contained under Layout component */
export const wrapPageElement = ({ element, props }) => {
    return <Layout {...props}>{element}</Layout>;
};
