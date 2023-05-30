import * as React from "react"
import ResponsiveText from "./ResponsiveText";


const TextTemplate = ({ pageContext }) => {
    const { titlePage, desc, titleText} = pageContext

    return <>
        <ResponsiveText scale={0.9}>{titlePage}</ResponsiveText>
        <ResponsiveText scale={0.7}>{titleText}</ResponsiveText>
        <ResponsiveText scale={0.5}>{desc}</ResponsiveText>
    </>
}


export default TextTemplate;
