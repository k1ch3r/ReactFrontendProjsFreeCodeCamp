import { useState, useEffect } from "react";
import "./styles.css"

export default function RngColor() {

    const [colors, setColors] = useState(["#ffffff","#000000"]);
    const [colorMode, setColorMode] = useState(10);
    const [darkTheme, setDarkTheme] = useState(true);
    const [themePrimary, setThemePrimary] = useState("");
    const [themeSecondary, setThemeSecondary] = useState("");

    useEffect(() => {
        const newThemePrimary = darkTheme ? colors[1] : colors[0];
        const newThemeSecondary = darkTheme ? colors[0] : colors[1];
        setThemePrimary(newThemePrimary);
        setThemeSecondary(newThemeSecondary);
    }, [colors, darkTheme]);

    const buttonStyle = {
        backgroundColor: themeSecondary,
        color: themePrimary,
        borderRadius: 5,
        padding: 7,
        justifySelf: "space-between"
    }

    function handleColorRolls() {
        let light = rollFullColor(195);
        let dark = rollFullColor(0, 30)
        setColors([light, dark]);
    }

    function rollColorValue(radix, min = 0, max = 256) {
        return Math.floor(min + Math.random() * (max - min)).toString(radix).padStart(2, '0');
    }

    function rollFullColor(min = 0, max = 256) {
        let r = rollColorValue(colorMode, min, max);
        let g = rollColorValue(colorMode, min, max);
        let b = rollColorValue(colorMode, min, max);
        return colorMode ===
        16 ? "#" + r + g + b
           : "rgb(" + r + "," + g + "," + b + ")";
    }

    function handleColorMode() {
        setColorMode(colorMode === 10 ? 16 : 10);
        convertColors();
    }

    function convertColors() {
        if(colorMode === 10) {
            let rgbs = [];

            colors.forEach(color => {
                color = color.substring(4, color.length - 1);
                rgbs = rgbs.concat(color.split(","));
            })

            let newLight = "#";
            let newDark = "#";

            rgbs.forEach((rgb, index) => {
                let hex = parseInt(rgb).toString(16).padStart(2, '0');
                if (index < 3) newLight += hex;
                else newDark += hex;
            });
            setColors([newLight, newDark])
            return;
        }
        if(colorMode === 16) {
            let decRgbs = [];

            colors.forEach(color => {
                decRgbs.push(parseInt(color.slice(1, 3), 16));
                decRgbs.push(parseInt(color.slice(3, 5), 16));
                decRgbs.push(parseInt(color.slice(5, 7), 16));
            });

            setColors([`rgb(${decRgbs[0]},${decRgbs[1]},${decRgbs[2]})`,`rgb(${decRgbs[3]},${decRgbs[4]},${decRgbs[5]})`])
        }
    }

    return <div
        className="wrapper"
        style={{ background: themePrimary, color: themeSecondary }}
    >

        <div
        className="info">
            light color: {colors[0]} <br/>
            dark color: {colors[1]}
        </div>

        <div
        className="buttonArea">

            <button
            onClick={ () => handleColorRolls() }
            style={buttonStyle}
            >
                RNGsus!
            </button>

            <button
            onClick={ () => handleColorMode() }
            style={buttonStyle}
            >
                { colorMode === 10 ? "toHex" : "toRGB" }
            </button>

            <button
            onClick={ () => setDarkTheme(!darkTheme) }
            style={buttonStyle}
            >
                Theme
            </button>

        </div>
    </div>

}