import { Container } from './Container';
export function container(injectable) {
    const container = injectable.container;
    if (!container) {
        throw new Error('"container" is not set on injectable object.');
    }
    if (!(container instanceof Container)) {
        throw new Error('"container" property of injectable is not an' +
            'instance of @airport/di Container');
    }
    return container;
}
//# sourceMappingURL=Injectable.js.map