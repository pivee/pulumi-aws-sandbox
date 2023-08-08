import * as dotenv from "dotenv";

export function exportEnv(filepath: string) {
    const config = dotenv.config({
        path: filepath,
    })

    const entries = Object.entries(config.parsed as { [key: string]: string });

    const exports: { name: string, value: string }[] = [];

    entries.map((entry) => {
        exports.push({
            name: entry[0],
            value: entry[1]
        })
    })

    return exports;
}
