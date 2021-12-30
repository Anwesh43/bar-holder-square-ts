import {useState, useEffect, CSSProperties} from 'react'

const scGap : number = 0.02 
const delay : number = 20 

export const useAnimatedScale = () => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (prev > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            return 0
                        }
                        return prev + scGap 
                    })
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        return () => {
            window.onresize = () => {

            }
        }
    })
    return {
        w, 
        h
    }
}

const maxScale = (scale : number, i : number, n : number) : number => Math.max(0, scale - i / n)
const divideScale = (scale : number, i : number, n : number) : number => Math.min(1 / n, maxScale(scale, i, n)) * n 
const sinify = (scale : number) : number => Math.sin(scale * Math.PI)

export const useStyle = (w : number, h : number, scale : number) => {
    const sf : number = sinify(scale)
    const sf1 : number = divideScale(sf, 0, 2)
    const sf2 : number = divideScale(sf, 1, 2)
    const size : number = Math.min(w, h) / 11.2 
    const position = 'absolute'
    const background = 'indigo'
    return {
        barStyle() : CSSProperties {
            const left = `${(w / 2 - size / 2) * (1 - sf1)}px`
            const top = `${h / 2 - size / 2}px`
            const width = `${size + (w - size) * sf1}px`
            const height = `${size}px`
            return {
                left, 
                top, 
                position, 
                width, 
                height, 
                background 
            }
        },
        squareStyle(i : number) : CSSProperties {
            const left = `${(w - size) * i}px`
            const height = `${size}px`
            const width = `${size}px`
            const top = `${-size + (h / 2 - size / 2 + size / 10) * sf2}px`
            return {
                position, 
                left, 
                top,
                width,
                height, 
                background 
            }
        }
    }
}