"use client"
import Link from "next/link";

import clsx from "clsx";
import app from "@/styles/app.module.scss";
import s from "./style.module.scss";

type colors = "black" | "white" | "grey" | "orange" | "blue" | "red" | "green";

type CommonBtnProps = {
    loading?: boolean,
    link?: boolean,
    classes?: string,

    color?: colors,
    bgColor?: colors,
    borderColor?: colors,
    
    text: string,
    icon?: React.ReactElement,
    iconColor?: colors,
    
    transition?: "shadow" | "grow" | "fill" | "border" | "bg" | "color",
    fillColor?: colors,
    fullWidth?: boolean,
    thin?: boolean,
    type?: "button" | "submit"
}

type BtnProps = 
    | (CommonBtnProps & { 
        link: true,
        href: string,
        onClick?: any,
    })
    
    | (CommonBtnProps & { 
        link?: false,
        href?: undefined,
        type: "button",
        onClick: (e?: any) => any,
    })
    
    | (CommonBtnProps & { 
        link?: false,
        href?: undefined,
        type: "submit",
        onClick?: undefined,
    })
    
    | (CommonBtnProps & {
        link?: false,
        href?: undefined,
        type?: undefined,
        onClick: (e?: any) => any,
    });

export function Btn(props: BtnProps): JSX.Element {
    const { 
        onClick,
        loading,
        link,
        classes,
        href,
        color,
        bgColor,
        borderColor,
        text,
        icon,
        iconColor,
        transition,
        fillColor,
        fullWidth,
        thin,
        type
    } = props;
    
    const btnColor = color 
    ? `color${getUppercase(color)}`
    :  "colorGrey"

    const btnBgColor = bgColor
    ? `bg${getUppercase(bgColor)}`
    :  ""

    const btnBorderColor = borderColor 
    ? `border${getUppercase(borderColor)}`
    :  ""

    const btnIconColor = iconColor 
    ? `icon${getUppercase(iconColor)}`
    :  "iconBlack"

    const btnTransition = transition 
    ? `trans${getUppercase(transition)}`
    :  "transGrow"

    const btnFillColor = /Fill|Border|Bg|Color/.test(btnTransition)
    ? `${btnTransition}${getUppercase(fillColor)}`
    :  ""

    const className = clsx(
        s.btn,
        s[btnColor],
        s[btnBgColor],
        s[btnBorderColor],
        s[btnIconColor],
        s[btnTransition],
        s[btnFillColor],
        loading && s.loading,
        fullWidth && s.fullWidth,
        thin && s.thin,
    ) 

    if (link) {
        return (
            <Link
                className={ `${classes} ${className}` }
                href={ href }
            > 
                { icon && icon }
                { text }
            </Link>
        )
    }

    return (
        <button 
            className={ `${classes} ${className}` }
            onClick={ onClick }
            type={ type || "button" }
        >   
            {
                loading 
                ?   <span className={ clsx(app.loader, app.loaderGrey, app.loaderXs) }/>
                :   <>
                        { icon && icon }
                        <span className={ clsx(s.text) }>
                            { text }
                        </span>
                    </>
            }
        </button>
    )

    function getUppercase(value?: string) {
        if (!value)
            return ""
        
        return `${value.charAt(0).toUpperCase()}${value.slice(1)}`
    }
}