export function depth_to_bar(m: Meters): Bar {
    return (m / 10 + 1) as Bar;
}

export function bar_to_depth(b: Bar): Meters {
    return ((b - 1) * 10) as Meters;
}

export function fo2_to_fn2(o2: Fraction): Fraction {
    return (1.0 - o2) as Fraction;
}

export function partial_pressure(p: Bar, f: Fraction): Bar {
    return (f * p) as Bar;
}

export function ead(depth: Meters, fo2: Fraction): Meters {
    const pressure: Bar = depth_to_bar(depth);
    const fn2: Fraction = fo2_to_fn2(fo2);
    const ppn2: Bar = partial_pressure(pressure, fn2);
    const equivalent_air_pressure: Bar = (ppn2 / 0.79) as Bar;
    return bar_to_depth(equivalent_air_pressure);
}
