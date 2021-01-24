export interface IConfig {
	loadRx: boolean
}

export let CONFIG: IConfig = {
	loadRx: true
};

export function configure(
	config: IConfig
) {
	CONFIG = config;
}
