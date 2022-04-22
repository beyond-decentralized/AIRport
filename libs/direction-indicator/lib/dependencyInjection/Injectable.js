import { Container } from './Container';
export function container(injectable) {
    const iocContainer = injectable.__container__;
    if (!iocContainer) {
        throw new Error('"container" is not set on injectable object.');
    }
    if (!(iocContainer instanceof Container)) {
        throw new Error('"container" property of injectable is not an' +
            'instance of @airport/di Container');
    }
    return iocContainer;
}
//# sourceMappingURL=Injectable.js.map