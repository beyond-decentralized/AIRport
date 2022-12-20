if (!globalThis.CLASSES) {
    globalThis.CLASSES = {}
}

// For Non-Injected (core) classes
export function addClasses(
    classes: [{ new(...args: any[]): any }]
) {
    const container = globalThis.CLASSES
    for (const clazz of classes) {
        let className = clazz.prototype.constructor.name
        // if (!container[className]) {
        //     container[className] = []
        // } else {
        //     console.warn(`More than one '${className}' loaded!`)
        // }
        // container[className].push(clazz)

        if(container[className]) {
            throw new Error(`Class ${className} is defined more than once!`)
        }
    }
}
