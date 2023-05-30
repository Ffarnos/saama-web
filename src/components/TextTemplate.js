import * as React from "react"
import ResponsiveText from "./ResponsiveText";
import {useEffect} from "react";
import {navigate} from "gatsby";


const TextTemplate = ({ pageContext }) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter')
                navigate("/circulo-base")
            else if (event.key === 'Backspace')
                navigate("/")
            else if (event.key === 'ArrowLeft')
                navigate(-1)
            else if (event.key === 'ArrowRight')
                navigate(+1)
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const { titlePage, desc, titleText} = pageContext

    return <>
        <ResponsiveText scale={0.9}>{titlePage}</ResponsiveText>
        <ResponsiveText scale={0.7}>{titleText}</ResponsiveText>
        <ResponsiveText scale={0.5}>{desc}</ResponsiveText>
    </>
}


export default TextTemplate;
